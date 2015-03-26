ECSVapor.factory('Helper', function ($rootScope, $q, $http) {
    var helper = {};

    helper.globals = [];
    helper.niceScrolles = [];

    //Stores all ajax request that should be aborted when a new one is dispached
    helper.requests = [];

    //Regular expresions used in validations along the app
    helper.onlyNumbersRegex = /^[0-9]{1,10}$/;
    helper.alphaNumericalRegex = /^[a-zA-Z0-9]+$/;
    helper.alphaNumericalSpaceAndDashRegex = /^[a-zA-Z0-9_-\s\.]+$/;
    helper.alphaNumericalDotSpaceAndDashRegex = /^[a-zA-Z0-9_-\s\.]+$/;
    helper.emptyOralphaNumericalDotSpaceAndDashRegex = /^$|[a-zA-Z0-9_-\s\.]+$/;

    //Store the current date and current year for featur useage
    helper.actualDate = new Date();
    helper.actualY = helper.actualDate.getFullYear();

    helper.autodeskColors = ['autodeskPrimaryBlue', 'autodeskProductColorGreen', 'autodeskProductColorYellow', 'autodeskRed'];

    //Return the mont name given an indicator namber month
    helper.getMonthName = function (monthNumber) {
        var month = new Array();
        month[0] = "Jan";
        month[1] = "Feb";
        month[2] = "Mar";
        month[3] = "Apr";
        month[4] = "May";
        month[5] = "Jun";
        month[6] = "Jul";
        month[7] = "Aug";
        month[8] = "Sep";
        month[9] = "Oct";
        month[10] = "Nov";
        month[11] = "Dec";
        return month[monthNumber];
    }

    //Return the app Version
    helper.getVersion = function () {
        $http.get(getVersion).success(function (response) {
            $rootScope.rawVersion = JSON.parse(response)
            $rootScope.Version = 'v' + $rootScope.rawVersion;
        });
    };

    helper.getFeatures = function () {
        return $http.get(getFeaturesUrl);
    };

    //Retrieves the username
    helper.getUserName = function () {
        $http.get(usernameUrl).success(function (data) {
            $rootScope.userFullname = JSON.parse(data);

            //We need to change de display element cause a chrome render bug
            $('li.user-name').css('display', 'block');
            $('li.user-name').css('display', 'inline-block');

            //Make visible the user name and logout option
            $('li.user-name a').css('visibility', 'visible');

        });
    };

    helper.getUserImage = function () {

        $http.get(userImageUrl).success(function (data) {
            var img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + data;
            $('.place-user-image').html(img);
        });
    };

    helper.getUserMenu = function () {
        var deferred = $q.defer();
        $http.get(vaporMenuUrl).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured when fetching data");
        });
        return deferred.promise;
    };

    /*
     * Retrieves all information about a user
     * If a request is in progres, returns the same request
     */
    helper.getUserRequestFlag = false;
    helper.getUserPromises = [];

    helper.getUser = function (forceRequest) {

        var makeRequest = forceRequest === true;
        var alert_message = {},
            message = '',
            currentPromise = $q.defer();


        //If we don't want the cached user, then force the request
        if (!$rootScope.user || makeRequest) {

            //Add a new promise to the promises array, to be resolved once the current request is finished
            helper.pushUserPromise(currentPromise);

            //If there isn't a request in progress
            if (helper.getUserRequestFlag === false) {
                helper.getUserRequestFlag = true;

                $http.get(userUrl).success(function (userInfo) {

                    //Once the request is finished, turns the flag to false again
                    helper.getUserRequestFlag = false;

                    //When user is in admin mode, we send an aditional parameter in the header
                    if (userInfo.IsAdminMode) {
                        $http.defaults.headers.common.IsAdminMode = true;
                    }
                    else {
                        if ($http.defaults.headers.common.IsAdminMode) {
                            delete $http.defaults.headers.common.IsAdminMode;
                        }
                    }

                    //If user is logged with the primary account, then I should notify
                    if (!userInfo.IsSecondary) {
                        message = 'You need to login with your secondary account to have full access';
                        alert_message = { 'level': 'info', 'message': message };
                        $rootScope.$broadcast('event:alertMessage', alert_message);
                    }

                    //Once the request is finished, resolves the general promise.
                    $rootScope.user = userInfo;

                    helper.resolveUserPromises(userInfo);

                });
            }

        }
        else {

            //If we want the user info which is in cache
            currentPromise.resolve($rootScope.user);
        }

        return currentPromise.promise;

    };

    helper.pushUserPromise = function (userPromise) {
        helper.getUserPromises.push(userPromise);
    }

    //Resolves all promises that waits for a request to finish
    helper.resolveUserPromises = function (userInfo) {
        var q = $q.defer();

        while (helper.getUserPromises.length) {
            var lastPromise = helper.getUserPromises.pop();
            lastPromise.resolve(userInfo);
            if (!helper.getUserPromises.length) {
                q.resolve();
            }
        }

        return q.promise;
    };

    //Reject all promises that waits for a request to finish
    helper.rejectUserPromises = function (message) {
        var q = $q.defer();

        while (helper.getUserPromises.length) {
            var lastPromise = helper.getUserPromises.pop();
            lastPromise.reject(message);
            if (!helper.getUserPromises.length) {
                q.resolve();
            }
        }

        return q.promise;
    }

    helper.resetUserRequest = function () {
        helper.rejectUserPromises("An error occured when fetching data");
        helper.getUserRequestFlag = false;
    }


    helper.storageManagerTabs = {
        'volumes': 1, 'snapshots': 2, 'images': 3
    };
    helper.getTab = function (route) {
        var ret = helper.storageManagerTabs[route];
        if (route === undefined || route === null) {
            ret = helper.storageManagerTabs['volumes'];
        }
        return ret;
    }

    //Retrieve user keys&groups
    helper.getUserKeys = function () {
        var deferred = $q.defer();
        $rootScope.user.accounts = {
        };
        $http.get(getUserKeysUrl).success(function (data) {
            $rootScope.user.accounts = data;
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured when fetching data");
        });

        return deferred.promise;
    }

    //Get a cookie by name
    helper.getCookie = function (c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }

    //
    helper.pushRequest = function (xhr) {
        helper.request.push(xhr);
    };


    //Iterates over an array of requests and abort them
    helper.abortRequest = function (requests) {
        for (var i = requests.length - 1; i > 0; i--) {
            requests[i].abort();
            requests.pop();
        }
    };

    //Used to stores request defers, so we can aborte them manually
    helper.cancelRequestDefers = [];

    /* 
     * Inserts a new angular defer into the defers array
     * @defer Deferred angular object
     */
    helper.pushCancelRequestDefers = function (defer) {
        helper.cancelRequestDefers.push(defer);
    };

    //Iterates over an array of defers and resolves them
    helper.resolveCancelRequestDefers = function () {
        for (var i = helper.cancelRequestDefers.length - 1; i > 0; i--) {
            helper.cancelRequestDefers[i].resolve('aborted');
            helper.cancelRequestDefers.pop();
        };
    };


    /**
     * Remove every instance of NiceScroll
     * Skip the first instance because it belongs to the body
     */
    helper.clearNiceScroll = function () {
    }

    /**
     * Insert an element @value into a given array
     * in the position @value
     * @arr Array to insert in
     * @value Int pos and value to insert
     */
    helper.updateArray = function (arr, value) {
        var ind = arr.indexOf(value);
        if (ind == -1) {
            arr.push(value);
        }
        else {
            arr.splice(ind, 1);
        }
    }

    //Convert a string to Capitalize
    helper.capitalize = function (name) {
        var retString = '';
        var newname = name.split(/(?=[A-Z])/);
        for (var i = 0; i < newname.length; i++) {
            retString += ' ' + newname[i];
        }
        return retString.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    };

    /**
     * Clean all global variables
     * Use internal array containing all vars we should clean
     */
    helper.cleanGlobals = function () {
        helper.globals = [];
    };

    helper.selectRow = function (oldElemId, selectedElemId) {
        if (oldElemId !== "") {
            $('#' + oldElemId).removeClass('ecs-selectedTd-background');
            $('#' + oldElemId).find('input').prop('checked', false);
        }
        $('#' + selectedElemId).addClass('ecs-selectedTd-background');
        $('#' + selectedElemId).find('input').prop('checked', true);
    }


    /************************** ADMIN FUNCTIONS ****************************************/

    /* 
     * Change between user states (enable/disable)
     */
    helper.setEnabledChecked = function (state) {
        return (state) ? 'checked' : '';
    }
    /**
     * Return message to show in tooltip
     * @state boolean, tells if it is Enable or Disable
     * @element string, Account or Group or Policy or Statement
     */
    helper.displayEnableTooltip = function (state, element) {
        return (state) ? 'Disable ' + element : 'Enable ' + element;
    }
    /*
     * Return message to show in tooltip (internal use)
     * @elem DOM, element in which apply title change
     * @state string, new status to be displayed
     * @type string, Account or Group or Policy or Statement
     */
    helper.switchEnableTooltip = function (elem, state, type) {
        $(elem).attr('title', state + ' ' + type);
    }

    /*Splits the search val eg "afasf -minusminus +aaaaaa -second minus" into two arrays
    * filterPlusResults = ['aaaaaa'] filterMinusResults['minusminus','second minus']
    */
    helper.splitSearchBoxVal = function (searchBoxVal, filterPlusResults, filterMinusResults) {

        //If the searchbox value is empty, then stops the execution.
        if (!searchBoxVal) {
            return;
        }

        var filterMinusOptions = searchBoxVal.split(' -');
        var length = filterMinusOptions.length;
        while (length--) {
            var splitPlusResult = filterMinusOptions[length].split(' +');
            var minusElement = splitPlusResult.shift();
            if (minusElement.length > 0) {
                filterMinusResults.push(minusElement);
            }
            if (splitPlusResult.length > 0) {
                while (splitPlusResult.length > 0)
                    filterPlusResults.push(splitPlusResult.shift());
            }
        }

        if (filterMinusResults.length > 0) {
            //first element added to the minus array could be -asfaf or afafas so we need to replace char or change it to plus list
            var firstSearchElement = filterMinusResults[filterMinusResults.length - 1];
            var element = firstSearchElement.trim();
            if (element.charAt(0) === "-") {
                if (element.length > 1) {
                    filterMinusResults[filterMinusResults.length - 1] = element.substr(1, element.length);
                }
            }
            else if (element.length > 0) {
                var plusElementToAdd = filterMinusResults.pop().trim();
                if (plusElementToAdd.charAt(0) === "+") {
                    plusElementToAdd = plusElementToAdd.substr(1, element.length);
                }
                filterPlusResults.push(plusElementToAdd);
            }
        }
    }


    /*
    <div ng-repeat="item in items | filter:criteriaMatch(criteria)">
        {{ item }}
    </div>
    scope:

    $scope.criteriaMatch = function( criteria ) {
        return function( item ) {
        return item.name === criteria.name;
        };
    };
    */

    helper.angularViewFilterSearch = function (searchValue, filterCampsArray) {
        var filterPlusResults = [];
        var filterMinusResults = [];
        if (searchValue !== undefined && searchValue !== "" && searchValue !== null) {
            helper.splitSearchBoxVal(searchValue, filterPlusResults, filterMinusResults);
        }
        var filterPlusResultsLength = filterPlusResults.length;
        var filterMinusResultsLength = filterMinusResults.length;
        return function (item) {
            if (searchValue === undefined || searchValue === null || searchValue === "" || searchValue.length < 1)
                return true;
            var orCondition = false; //( !!~str.indexOf(a) || !!~str.indexOf(b) || !!~str.indexOf(c) )
            var andCondition = false; //!(str == a || str == b || str == c || str == d )   !(a||b) = !a && !b
            for (var i = 0; i < filterCampsArray.length; i++) {
                var value = item[filterCampsArray[i]];
                var plusLength = filterPlusResultsLength;
                if (!orCondition) {
                    orCondition = helper.searchValue(value, filterPlusResults);
                }
                andCondition = helper.searchValue(value, filterMinusResults);

                if (andCondition) {
                    break;
                }
            }
            return !(!orCondition && filterPlusResultsLength > 0 || andCondition);
        };
    }

    helper.checkStringValue = function (val1, val2) {
        var type = typeof val1;
        if (type === "boolean" || type === "number") {
            val1 = val1.toString();
        }
        if (helper.isUndefinedOrNull(val1) || helper.isUndefinedOrNull(val2)) {
            return false;
        }

        if (val2.length > 1 && val2[0] === "\"" && val2[val2.length - 1] === "\"") {
            return val1.toLowerCase() === val2.substring(1, val2.length - 1).toLowerCase();
        }

        return !!~val1.toLowerCase().indexOf(val2.toLowerCase());
    }

    /*
        searchValue eg. "+peter +false -true -post"
        listToFilter will end up being the result of applying the filters
        filterCampsArray are the filter camps that will be filtered eg:  ['Action', 'Description', 'IsAsync','MethodType'];
        true or false camps can be filtered. Added typeof value === "boolean" in case a boolean value is going to be added in the filter
    */
    helper.angularFilterSearch = function (searchValue, listToFilter, filterCampsArray) {
        var filterPlusResults = [];
        var filterMinusResults = [];
        helper.splitSearchBoxVal(searchValue, filterPlusResults, filterMinusResults);
        //item will stay in the list only if the +filter items contains the string and none of the -items contains the exact string
        var completeListLength = listToFilter.length;
        var filterPlusResultsLength = filterPlusResults.length;
        var filterMinusResultsLength = filterMinusResults.length;
        while (completeListLength--) {
            var orCondition = false; //( !!~str.indexOf(a) || !!~str.indexOf(b) || !!~str.indexOf(c) )
            var andCondition = false; //!(str == a || str == b || str == c || str == d )   !(a||b) = !a && !b
            for (var i = 0; i < filterCampsArray.length; i++) {
                var value = listToFilter[completeListLength][filterCampsArray[i]];
                if (!orCondition) {
                    orCondition = helper.searchValue(value, filterPlusResults);
                }
                andCondition = helper.searchValue(value, filterMinusResults);
                if (andCondition) {
                    break;
                }
            }

            if (!orCondition && filterPlusResultsLength > 0 || andCondition) {
                listToFilter.splice(completeListLength, 1);
            }
        }
    }

    /*
        searchValue eg. "+peter +false -true -post"
        listToFilter will end up being the result of applying the filters
        filterCampsArray are the filter camps that will be filtered eg:  ['Action', 'Description', 'IsAsync','MethodType'];
        true or false camps can be filtered. Added typeof value === "boolean" in case a boolean value is going to be added in the filter
    */
    helper.angularFilterSearchWithSubSearch = function (searchValue, listToFilter, filterCampsArray, subFilterArrays) {
        var filterPlusResults = [];
        var filterMinusResults = [];
        helper.splitSearchBoxVal(searchValue, filterPlusResults, filterMinusResults);
        //item will stay in the list only if the +filter items contains the string and none of the -items contains the exact string
        var completeListLength = listToFilter.length;
        var filterPlusResultsLength = filterPlusResults.length;
        var filterMinusResultsLength = filterMinusResults.length;
        while (completeListLength--) {
            var orCondition = false;
            var andCondition = false;
            for (var i = 0; i < filterCampsArray.length; i++) {
                var value = listToFilter[completeListLength][filterCampsArray[i]];
                if (!orCondition) {
                    orCondition = helper.searchValue(value, filterPlusResults);
                }
                andCondition = helper.searchValue(value, filterMinusResults);
                if (andCondition) {
                    break;
                }
            }

            if (andCondition) {
                listToFilter.splice(completeListLength, 1);
            }
            else {
                var orCondition2 = false;
                var andCondition2 = false;
                for (var i = 0; i < subFilterArrays.length; i++) {
                    var subArray = listToFilter[completeListLength][subFilterArrays[i]];
                    if (!orCondition && !orCondition2) {
                        orCondition2 = helper.findCondition(subArray, filterPlusResults);
                    }
                    andCondition2 = helper.findCondition(subArray, filterMinusResults);
                    if (andCondition2) {
                        break;
                    }
                }

                if (!(orCondition || orCondition2) && filterPlusResultsLength > 0 || andCondition2) {
                    listToFilter.splice(completeListLength, 1);
                }
            }
        }
    }

    helper.findCondition = function (arr, filterResults) {
        var length = arr.length;
        while (length--) {
            if (helper.searchValue(arr[length], filterResults)) {
                return true;
            }
        }
        return false;
    }



    helper.searchValue = function (value, array) {
        var length = array.length;
        while (length--) {
            if (helper.checkStringValue(value, array[length])) {
                return true;
            }
        }
        return false;
    }

    helper.FilterEmptyValues = function (comboboxFilterArr) {
        var length = comboboxFilterArr.length;
        while (length--) {
            if (comboboxFilterArr[length].value === "") {
                comboboxFilterArr.splice(length, 1);
            }
        }
        return comboboxFilterArr;
    }
    helper.KendoSearch = function (gridId, searchBoxVal, gridItems, comboBoxFilters) {
        //Filters arrays
        var filterPlusResults = [];
        var filterMinusResults = [];
        helper.splitSearchBoxVal(searchBoxVal, filterPlusResults, filterMinusResults);
        var minusResultsLength = filterMinusResults.length;
        var minusFilters = [];
        while (minusResultsLength--) {
            var operator = "doesnotcontain";
            if (filterMinusResults[minusResultsLength].length > 1 && filterMinusResults[minusResultsLength][0] === "\"" && filterMinusResults[minusResultsLength][minusResultsLength] === "\"") {
                filterMinusResults[minusResultsLength] = filterMinusResults[minusResultsLength].substring(1, filterMinusResults[minusResultsLength].length - 1);
                operator = "neq";
            }
            $.merge(
                minusFilters, helper.searchFilters(gridItems, filterMinusResults[minusResultsLength], operator)//"neq")
            );
        }
        //merge of coboboxFilters if they exist into the filters
        if (comboBoxFilters && comboBoxFilters.length > 0) {
            $.merge(minusFilters, helper.FilterEmptyValues(comboBoxFilters));
        }

        var plusResultsLength = filterPlusResults.length;
        var plusFilters = [];
        while (plusResultsLength--) {
            var operator = "contains";
            if (filterPlusResults[plusResultsLength].length > 1 && filterPlusResults[plusResultsLength][0] === "\"" && filterPlusResults[plusResultsLength][plusResultsLength] === "\"") {
                filterPlusResults[plusResultsLength] = filterPlusResults[plusResultsLength].substring(1, filterPlusResults[plusResultsLength].length - 1);
                operator = "eq";
            }
            $.merge(
                plusFilters, helper.searchFilters(gridItems, filterPlusResults[plusResultsLength], operator)
            );
        }

        //filter objects
        var kendoGridFilters = [];
        if (minusFilters.length > 0) {
            kendoGridFilters.push({
                logic: "and",
                filters: minusFilters
            });
        }
        if (plusFilters.length > 0) {
            kendoGridFilters.push({
                logic: "or",
                filters: plusFilters
            });
        }

        if ($(gridId).data("kendoGrid") !== undefined) {
            $(gridId).data("kendoGrid").dataSource.filter(kendoGridFilters);
        }
    }

    //param array with the field names, value that will be applied and the operator of the filter
    helper.searchFilters = function (arr, val, operator) {
        var filtersArray = [];
        var defaultOperator = operator == undefined ? 'contains' : operator;
        var arrlength = arr.length;
        for (var i = 0; i < arrlength; i++) {
            filtersArray.push({ field: arr[i], operator: defaultOperator, value: val });
        }

        return filtersArray;
    }

    helper.checkboxCheckAll = function (grid, $scope) {
        $(grid).on("click", ":checkbox", function () {
            var checkboxes = $(grid).find(':checkbox');
            if ($(this).attr('id') == "checkAll") {
                checkboxes.prop("checked", $(this).is(':checked'));
            }
            var checkboxChecked = checkboxes.filter(':checked').length > 0;

            $scope.$apply(function () {
                $scope.isOneChecked = checkboxChecked;
            });
        });
    };

    helper.checkboxUnCheckAll = function (grid, $scope) {
        $(grid).find(':checkbox').prop("checked", false);
        $scope.isOneChecked = false;
    };

    helper.getListIndexById = function (list, id, field) {
        if (helper.isUndefinedOrNull(list) || helper.isUndefinedOrNull(id)) {
            return false;
        }
        var index = 0,
            found = false;

        if (field === undefined) {
            field = 'Id';
        }

        while (!found && (index < list.length)) {
            if (list[index] && list[index][field] == id) { found = true; }
            else {
                index++;
            }
        }
        return (found) ? index : false;
    };

    helper.getItemByFieldValue = function (arr, value, field) {
        if (helper.isUndefinedOrNull(arr) || helper.isUndefinedOrNull(value) || helper.isUndefinedOrNull(field)) {
            return -1;
        }
        var arrLength = arr.length;
        while (arrLength--) {
            if (arr[arrLength][field] === value)
                return arr[arrLength];
        }
        return -1;
    }

    helper.getListIndexByFields = function (list, field1, value1, field2, value2) {
        var index = 0,
            found = false;

        if (!list) {
            return false;
        }

        while (!found && (index < list.length)) {
            if (list[index] && (list[index][field1] == value1) && (list[index][field2] == value2)) {
                found = true;
            }
            else {
                index++;
            }
        };
        return (found) ? index : false;
    };

    // Implement animation to toggle a table row
    helper.animateToState = function (elem_selector, subelem_selector, finalState) {
        var jq_elem = $(elem_selector),
            jq_subelem = $(subelem_selector),
            expand = (finalState === 'close') ? false : (!jq_elem.hasClass('ecs-expanded'));
        if (expand) {
            jq_elem.addClass('ecs-table-selected ecs-expanded').find('i.ecs-ic-expand-collapse').toggleClass('fa-chevron-down fa-chevron-right');
            jq_subelem.slideDown('slow').removeClass('ecs-hidden');
        } else {
            jq_elem.removeClass('ecs-table-selected ecs-expanded').find('i.ecs-ic-expand-collapse').toggleClass('fa-chevron-right fa-chevron-down');
            jq_subelem.hide().addClass('ecs-hidden');
        };
    };

    helper.setItem = function (configName, value, isUserConfig) {
        isUserConfig = isUserConfig || true;
        if (isUserConfig) {
            helper.getUser(false).then(function () {
                configName += $rootScope.user.UserId;
                localStorage.setItem(configName, value);
            });
        }
        else {
            localStorage.setItem(configName, value);
        };
    };

    helper.getItem = function (configName, isUserConfig) {
        var deferred = $q.defer();
        isUserConfig = isUserConfig || true;
        var loadedConfig;
        if (isUserConfig) {
            helper.getUser(false).then(function () {
                configName += $rootScope.user.UserId;
                deferred.resolve(localStorage.getItem(configName));
            });
        }
        else {
            deferred.resolve(localStorage.getItem(configName));
        };
        return deferred.promise;
    };

    helper.removeItem = function (configName, isUserConfig) {
        isUserConfig = isUserConfig || true;
        configName += (isUserConfig) ? $rootScope.user.UserId : '';
        localStorage.removeItem(configName);
    }
    helper.clearArray = function (arr) {
        while (arr.length > 0) {
            arr.pop();
        };
    };

    helper.findParentElement = function (element, tagg) {
        if (element === null || element === undefined)
            return null;
        if (element.nodeName.toLowerCase() == tagg.toLowerCase()) {
            return element;
        }
        else {
            return helper.findParentElement(element.parentElement, tagg);
        };
    };

    helper.propertyValueExistInArray = function (property, value, arr) {
        var arrLength = arr.length;
        while (arrLength--) {
            if (arr[arrLength][property] === value) {
                return true;
            }
        }
        return false;
    }

    helper.deleteByPropertyAndValueInArray = function (property, value, arr) {
        var arrLength = arr.length;
        while (arrLength--) {
            if (arr[arrLength][property] === value) {
                arr.splice(arrLength, 1);
                return;
            }
        }
    }

    helper.deleteAllIfNotMatch = function (property, value, arr) {
        var arrLength = arr.length;
        while (arrLength--) {
            if (arr[arrLength][property] !== value) {
                arr.splice(arrLength, 1);
            }
        }
    }

    helper.inputValidation = function (input, regex) {
        if (input.value.match(regex) == null) {
            input.classList.add('mandatory-field', 'errorSearchBox');
            return false;
        };
        return true;
    };

    helper.findParentElement = function (element, tagg) {
        if (element === null || element === undefined)
            return null;
        if (element.nodeName.toLowerCase() == tagg.toLowerCase()) {
            return element;
        }
        else {
            return helper.findParentElement(element.parentElement, tagg);
        }
    }

    helper.addClassFromList = function (parentElement, classArrList, classToAdd) {
        if (parentElement) {
            var classArrListLength = classArrList.length;
            while (classArrListLength--) {
                var element = parentElement.getElementsByClassName(classArrList[classArrListLength])[0];
                if (element) {
                    element.classList.add(classToAdd);
                }
            }
        }
    }

    helper.removeClassFromList = function (parentElement, classArrList, classToRemove) {
        if (parentElement) {
            var classArrListLength = classArrList.length;
            while (classArrListLength--) {
                var element = parentElement.getElementsByClassName(classArrList[classArrListLength])[0];
                if (element) {
                    element.classList.remove(classToRemove);
                }
            }
        }
    }

    helper.sortArray = function (inputArray, sortCriteria, sortByValue) {

        if (inputArray) {
            if (inputArray instanceof kendo.data.DataSource) {
                inputArray._sort = sortCriteria;
            }
            else if (sortCriteria.field) {
                inputArray.sort(function (a, b) {
                    var comparison, aAsString, bAsString;

                    if (sortByValue !== undefined) {
                        comparison = a - b;
                    }
                    else {
                        aAsString = String(a[sortCriteria.field]);
                        bAsString = String(b[sortCriteria.field]);
                        comparison = aAsString.localeCompare(bAsString);
                    };

                    return comparison;
                });
                if (sortCriteria.dir == 'desc') {
                    inputArray.reverse();
                };
            }
            else {
                inputArray.sort();
                if (sortCriteria.dir == 'desc') {
                    inputArray.reverse();
                };
            };
        };
    };

    helper.capitaliseFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    helper.actions = {
        StartInstances: 'StartInstances',
        StopInstances: 'StopInstances',
        RebootInstances: 'RebootInstances',
        DeleteInstances: 'DeleteInstances',
        RecoverInstance: 'RecoverInstance',
        ExpungeInstances: 'ExpungeInstances',
        CreateInstances: 'CreateInstances',
        DeleteInstanceSnapshots: 'DeleteInstanceSnapshots',
        CreateInstanceSnapshot: 'CreateInstanceSnapshot',
        CreateVolume: 'CreateVolume',
        DeleteVolumes: "DeleteVolumes",
        AttachVolume: 'AttachVolume',
        DetachVolume: 'DetachVolume',
        CreateImage: 'CreateImage',
        CreateSnapshot: 'CreateSnapshot',
        DeleteSnapshots: 'DeleteSnapshots',
        DeleteImages: 'DeleteImages'
    };

    helper.instanceStatus = { Processing: 'Processing', Completed: 'Completed', Error: 'Error' };

    helper.isUndefinedOrNull = function (obj) {
        return obj === null || obj === undefined;
    }

    helper.isIeBrowser = function () {
        return navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true;
    }

    helper.getStatusClass = function (actionExecuted) {
        switch (actionExecuted.split('Async')[0].toLowerCase()) {
            case 'createinstances':
            case 'startinstances':
            case 'enablegpu':
            case 'rebootinstances':
                return 'Running';
            case 'deleteinstances':
                return 'Destroyed';
            case 'recoverinstance':
            case 'disablegpu':
            case 'reverttoinstancesnapshot':
            case 'stopinstances':
                return 'Stopped';
            case 'expungeinstances':
                return 'Expunged';
        }
    };

    helper.pretifyJsonCode = function (json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    $rootScope.$on('resetUserRequest', function () {
        helper.resetUserRequest();
    });

    helper.Message = function (level, msg) {
        $rootScope.$broadcast('event:alertMessage', { 'level': level, 'message': msg });
    }

    return helper;
});
