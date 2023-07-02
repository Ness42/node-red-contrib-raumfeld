"use strict";

module.exports = function(RED) {
    function RaumfeldRoomAddToZoneNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.raumkernelNode = RED.nodes.getNode(config.raumkernel);

        node.on("input", function(msg) {
            var roomNames = config.roomNames || msg.roomNames || msg.payload;
            if (roomNames) roomNames = roomNames.split(",");
            var zoneName = "uuid:ffffffff-ea9e-805a-ffff-ffffea9e805a"



            var roomMediaRenderers = []

            roomNames.forEach(roomName => {
                roomMediaRenderers.push(node.raumkernelNode.deviceManager.getMediaRenderer(roomName));
            });

            async function addRoomToZone() {
                for (let roomMediaRenderer of roomMediaRenderers) {
                    await node.raumkernelNode.zoneManager.connectRoomToZone(roomMediaRenderer.roomUdn(), zoneName, true).catch(async function () {
                        await node.raumkernelNode.zoneManager.connectRoomToZone(roomMediaRenderer.roomUdn(), zoneName, true);
                    });
                }
            }

            addRoomToZone();
        });
    }
    RED.nodes.registerType("raumfeld-room-add-to-zone", RaumfeldRoomAddToZoneNode);
}