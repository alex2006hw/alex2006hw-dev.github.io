# @cjsx React.DOM

React = require("react")

FormMixin = require("../form-elements/mixin-form")

Component = React.createClass
    mixins: [FormMixin]
    render: ->
        <div>
          LinkForm
        </div>

module.exports = Component
