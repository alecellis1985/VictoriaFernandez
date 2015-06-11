Professionals.factory('Helper', ['$rootScope', '$q', '$http', function ($rootScope, $q, $http) {
        var helper = {};
        //Regular expresions used in validations along the app
        helper.onlyNumbersRegex = /^[0-9]{1,10}$/;
        helper.alphaNumericalRegex = /^[a-zA-Z0-9]+$/;
        helper.alphaNumericalSpaceAndDashRegex = /^[a-zA-Z0-9_-\s\.]+$/;
        helper.alphaNumericalDotSpaceAndDashRegex = /^[a-zA-Z0-9_-\s\.]+$/;
        helper.emptyOralphaNumericalDotSpaceAndDashRegex = /^$|[a-zA-Z0-9_-\s\.]+$/;

        //Store the current date and current year for featur useage
        helper.actualDate = new Date();
        helper.actualY = helper.actualDate.getFullYear();

        /*
         * Retrieves all information about a user
         * If a request is in progres, returns the same request
         */
        helper.getUserRequestFlag = false;
        helper.getUserPromises = [];

        //Retrieves the username
        helper.getUser = function (forceRequest) {
            var currentPromise = $q.defer();
            /*If we don't want the cached user, then force the request*/
            if (!$rootScope.user || forceRequest === true) {
                /*Add a new promise to the promises array, to be resolved once the current request is finished*/
                helper.pushUserPromise(currentPromise);
                /*If there isn't a request in progress*/
                if (helper.getUserRequestFlag === false) {
                    helper.getUserRequestFlag = true;
                    $http.get('api/users/loggedUser').success(function (user) {
                        /*Once the request is finished, turns the flag to false again*/
                        helper.getUserRequestFlag = false;
                        /*When user is in admin mode, we send an aditional parameter in the header*/

//                    if (user.IsAdminMode) {
//                        $http.defaults.headers.common.IsAdminMode = true;
//                    }
//                    else {
//                        if ($http.defaults.headers.common.IsAdminMode) {
//                            delete $http.defaults.headers.common.IsAdminMode;
//                        }
//                    }

                        /*Once the request is finished, resolves the general promise.*/
                        if (user.success)
                        {
                            $rootScope.user = user;
                        }
                        else
                        {
                            delete $rootScope.user;
                        }

                        helper.resolveUserPromises(user);
                    });
                }
            }
            else {
                /*If we want the user info which is in cache*/
                currentPromise.resolve($rootScope.user);
            }
            return currentPromise.promise;
        };

        helper.pushUserPromise = function (userPromise) {
            helper.getUserPromises.push(userPromise);
        }

        /*Resolves all promises that waits for a request to finish*/
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
            return retString.replace(/(?:^|\s)\S/g, function (a) {
                return a.toUpperCase();
            });
        };


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
                if (list[index] && list[index][field] == id) {
                    found = true;
                }
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
            }
            ;
            return (found) ? index : false;
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
            }
            ;
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
            }
            ;
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
            }
            ;
        };

        helper.findParentElement = function (element, tagg) {
            if (element === null || element === undefined)
                return null;
            if (element.nodeName.toLowerCase() === tagg.toLowerCase()) {
                return element;
            }
            else {
                return helper.findParentElement(element.parentElement, tagg);
            }
            ;
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
            }
            ;
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
                        }
                        ;

                        return comparison;
                    });
                    if (sortCriteria.dir == 'desc') {
                        inputArray.reverse();
                    }
                    ;
                }
                else {
                    inputArray.sort();
                    if (sortCriteria.dir == 'desc') {
                        inputArray.reverse();
                    }
                    ;
                }
                ;
            }
            ;
        };

        helper.capitaliseFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        helper.isUndefinedOrNull = function (obj) {
            return obj === null || obj === undefined;
        }

        helper.isIeBrowser = function () {
            return navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true;
        }

        helper.Message = function (level, msg) {
            $rootScope.$broadcast('event:alertMessage', {'level': level, 'message': msg});
        }

        helper.randomString = function (letters)
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < letters; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        };

        helper.stringTime = function (dateTime) {
            var hours = dateTime.getHours();
            var minutes = dateTime.getMinutes();
            var seconds = 0;//dateTime.getSeconds();
            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return hours + ":" + minutes + ":" + seconds;
        };


        helper.timeFromString = function (stringTime) {
            var pieces = stringTime.split(':')
            var hour, minute;

            if (pieces.length === 3) {
                hour = parseInt(pieces[0], 10);
                minute = parseInt(pieces[1], 10);
            }

            var initHour = new Date();
            initHour.setHours(hour);
            initHour.setMinutes(minute);

            return initHour;
        };

        helper.getHorarioAtencionText = function (comienzo, fin) {
            var horaInicio = comienzo.substring(0, comienzo.length - 3);
            var horaFin = fin.substring(0, fin.length - 3);
            var textResult = "";
            textResult = "De " + horaInicio + " hs a " + horaFin + " hs";
            return textResult;

        };

        helper.getDiasAtencionText = function (diasAtencion) {
            var textResult = "";
            if (diasAtencion.lunes)
                textResult = "Lunes";
            if (diasAtencion.martes) {
                textResult += (textResult === "" ? "Martes" : ", Martes");
            }
            if (diasAtencion.miercoles) {
                textResult += (textResult === "" ? "Miercoles" : ", Miercoles");
            }
            if (diasAtencion.jueves) {
                textResult += (textResult === "" ? "Jueves" : ", Jueves");
            }
            if (diasAtencion.viernes) {
                textResult += (textResult === "" ? "Viernes" : ", Viernes");
            }

            if (diasAtencion.sabado) {
                textResult += (textResult === "" ? "Sabado" : ", Sabado");
            }

            if (diasAtencion.domingo) {
                textResult += (textResult === "" ? "Domingo" : ", Domingo");
            }

            return textResult;
        }

        helper.getFormasDePagoText = function (formasDePago) {
            var textResult = "";
            if (formasDePago.contado)
                textResult = "Contado";
            if (formasDePago.debito) {
                textResult += (textResult === "" ? "Debito" : ", Debito");
            }
            if (formasDePago.credito) {
                textResult += (textResult === "" ? "Credito" : ", Credito");
            }
            if (formasDePago.otras) {
                textResult += (textResult === "" ? "Otras" : ", Otras");
            }

            return textResult;
        };

        return helper;
    }]);
