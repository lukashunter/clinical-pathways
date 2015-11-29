function handlerConnectClick() {
    var activityId = this.getAttribute('data-activityId');
    createNewPath(activityId);
}

function createTransitions(toId) {
    $('#drawing').off();
    connectMode.active = false;
    connectMode.path.remove();

    var transitions = {
        from: connectMode.fromId,
        to: toId,
        name: ''
    };

    prepareConnection(transitions);
}

function showConnectButton() {
    connectId.removeClass('hide');
}

function hideConnectButton() {
    connectId.addClass('hide');
}
