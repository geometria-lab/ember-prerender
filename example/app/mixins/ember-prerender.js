import Ember from 'ember';

export default Ember.Mixin.create({
  willComplete: function() {
    Ember.RSVP.resolve();
  },
  actions: {
    didTransition: function() {
      this._super();

      var promises = [];
      var currentHandlerInfos = this.router.get('router.currentHandlerInfos');
      for (var i = 0; i < currentHandlerInfos.length; i++) {
        if (currentHandlerInfos[i].handler.willComplete) {
          promises.push(currentHandlerInfos[i].handler.willComplete());
        }
      }

      Ember.RSVP.all(promises).then(window.prerenderReady);
    }
  }
});

