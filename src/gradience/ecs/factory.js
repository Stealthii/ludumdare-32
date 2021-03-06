'use strict';

var Components = require('./components');

/**
 * Module to create an Entity
 **/
var EntityFactory = (function() {

    var entityCount = 0;
    var entities = [];

    var Entity = function(componentList) {
        this.uid = Date.now() + Math.floor(
            Math.random() * 100000
        ) + '_' + entityCount;
        this._components = [];

        if (componentList) {
            var self = this;
            componentList.forEach(function(component) {
                self.addComponent.apply(self, component);
            });
        }
    };

    Entity.prototype = {
        addComponent: function(componentId, params) {
            this._components[componentId] = params;

            if (typeof Components[componentId] === 'function') {
                Components[componentId].call(this, params);
            }
        },
        removeComponent: function(componentId) {
            if (this._components.hasOwnProperty(componentId)) {
                this._components[componentId] = undefined;
                delete this._components[componentId];
            }
        },
        has: function(componentId) {
            return this._components.hasOwnProperty(componentId);
        }
    };

    function createEntity(componentList) {
        var entity = new Entity(componentList);
        entities.push(entity);
        entityCount = entities.length;

        return entity;
    }

    function getEntities() {
        return entities;
    }

    function clearEntities() {
        entityCount = 0;
        entities = [];
    }

    return {
        create: createEntity,
        getAll: getEntities,
        clear: clearEntities
    };

})();

module.exports = EntityFactory;
