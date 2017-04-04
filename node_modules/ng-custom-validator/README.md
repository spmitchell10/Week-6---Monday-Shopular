# Custom validation directive for AngularJS
[![Build Status](https://travis-ci.org/Crevil/ng-custom-validator.svg?branch=master)](https://travis-ci.org/Crevil/ng-custom-validator)
[![Coverage Status](https://coveralls.io/repos/github/Crevil/ng-custom-validator/badge.svg?branch=master)](https://coveralls.io/github/Crevil/ng-custom-validator?branch=master)
[![npm version](https://badge.fury.io/js/ng-custom-validator.svg)](https://badge.fury.io/js/ng-custom-validator)

This is a generic validation directive to simplify custom validators for [AngularJS](https://angularjs.org/) written in [TypeScript](https://www.typescriptlang.org/).

To create a custom validator you need to specify a single `isValid()` method.
The wrapper takes care of setting the `ngModel` validity.

# Installation

```
npm install ng-custom-validator --save
```

# Usage
To create a custom validator, implement the `IValidator` interface and register it with the `CustomValidator` class.

```typescript
export interface IValidator<TDependencies> {
  isValid<TValue>(value: TValue, attrs?: ng.IAttributes): boolean;
  setDependencies?(dependencies: TDependencies): void;
}
```
Implement this interface for your custom validator.

`isValid<TValue>(value: TValue, attrs?: ng.IAttributes): boolean`

Return the validity of the value parameter. This is where the custom validation logic goes.
The `attrs` parameter holds the  attributes on the `<input />` tag the directive is attached to.
This is useful when validating a value against some other value.

`setDependencies?(dependencies: TDependencies): void;`

Optional method for getting injected dependencies.
If the validator needs access to an AngularJS service this is where they are injected.

`class CustomValidator<TDependencies>`

This is the class implementing the AngularJS specific details.
Use it to register the directive with AngularJS.
The constructor takes the a validator of type `IValidator` and a `directiveName` as paramaters and takes care of the rest.
The directive name is used to set the form validity classes, e.g. if name is  `minValue` the input will be marked with the CSS class `ng-invalid-min-value` by AngularJS.

# Examples
See live examples by running `npm start` or head into the `examples` folder.

## Minimum value validator
Create a class implementing the `Validator<TDependencies>` interface and register the directive with AngularJS.

```typescript
import { IValidator } from 'ng-custom-validator';

interface IMinValueAttrs extends ng.IAttributes {
    minValue: string;
}

class MinValueValidator implements IValidator<void> {
    public isValid(value: number, attrs?: IMinValueAttrs ): boolean {
        if (!attrs.minValue) {
            return false;
        }

        return value >= parseInt(attrs.minValue, 10);
    }
}

const validator = new CustomValidator(MinValueValidator, 'minValue');
angular
    .module('app', [])
    .directive('minValue', validator.factory);
```

In the view the validator is used like any other directive:
```html
<form name="form">
    <input ng-model="ctrl.minValue">
    <input name="value" ng-model="ctrl.value" min-value="{{ctrl.minValue}}"/>
    <div ng-if="form.value.$invalid">
        <p>Value should be above minimum value.</p>
    </div>
</form>
```

## Validator using dependency injection
This example shows a date format validator with `moment` and a date format string injected by AngularJS.

```typescript
import * as angular from 'angular';
import * as moment from 'moment';

import { IValidator } from 'ng-custom-validator';

interface IDateFormatDependencies {
  dateFormat: string;
}

class DateFormatValidator implements IValidator<IDateFormatDependencies> {
  private dateFormat: string;

  public isValid(value: string): boolean {
    return moment(value, this.dateFormat, true).isValid();
  }

  public setDependencies(deps: IDateFormatDependencies): void {
    this.dateFormat = deps.dateFormat;
  }
}
const dateValidValidator = new CustomValidator(DateFormatValidator, 'dateFormat');

angular
    .module('app', [])
    .constant('dateFormat', 'MM/DD/YYYY')
    .directive('dateFormat', (dateFormat: string) => dateValidValidator.factory({ dateFormat }));
```

In the view the validator is used like any other directive:
```html
<form name="form">
    <input name="date" ng-model="ctrl.date" date-format />
    <div ng-if="form.date.$invalid">
        <p>Date is not in the right format.</p>
    </div>
</form>
```
