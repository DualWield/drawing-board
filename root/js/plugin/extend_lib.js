(function (_) {
    _.mixin({
        distanceBetween: function (point1, point2) {
            return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
        },
        angleBetween: function (point1, point2) {
            return Math.atan2(point2.x - point1.x, point2.y - point1.y);
        },
        midPoint: function (p1, p2) {
            return {
                x: (p2.x + p1.x) / 2,
                y: (p2.y + p1.y) / 2
            };
        }
    })
})(_);