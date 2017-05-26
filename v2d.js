(function(ext) {
    ext._shutdown = function() {};

    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.x = function(v) {
        return parseFloat(v.split(',')[0]);
    }
    
    ext.y = function(v) {
        return parseFloat(v.split(' ')[1]);
    }
    
    ext.vector = function(x, y) {
        return x + ', ' + y;
    };
    
    ext.plus = function(a, b) {
        return ext.vector(ext.x(a) + ext.x(b), ext.y(a) + ext.y(b));
    }
    
    ext.minus = function(a, b) {
        return ext.vector(ext.x(a) - ext.x(b), ext.y(a) - ext.y(b));
    }
    
    ext.scale = function(scale, v) {
        return ext.vector(scale * ext.x(v), scale * ext.y(v));
    }
    
    ext.scale_inverse = function(v, scale) {
         return ext.vector(ext.x(v) / scale,  ext.y(v) / scale);
    }
    
    ext.magnitude = function(v) {
        x = ext.x(v);
        y = ext.y(v);
        return Math.sqrt(x * x + y * y);
    }
    
    ext.dot = function(a, b) {
        return ext.x(a) * ext.x(b) + ext.y(a) * ext.y(b);
    }
    
    ext.angle = function(v) {
        return Math.atan2(ext.y(v), ext.x(v)) * 57.2957795131;
    }
    
    ext.normalized = function(v) {
        x = ext.x(v);
        y = ext.y(v);
        m = Math.sqrt(x * x + y * y);
        return ext.vector(x / m, y / m);
    }
    
    ext.unit = function(theta) {
        theta *= 0.01745329251;
        return ext.vector(Math.cos(theta), Math.sin(theta));
    }

    var descriptor = {
        blocks: [
            ['r', '%n , %n', 'vector', 20, 40],
            ['r', '%n x', 'x', '20, 40'],
            ['r', '%n y', 'y', '20, 40'],
            ['r', '%n + %n', 'plus', '10, 10', '10, -10'],
            ['r', '%n - %n', 'minus', '10, 10', '10, -10'],
            ['r', '%n * %n', 'scale', '2', '2, -3'],
            ['r', '%n / %n', 'scale_inverse', '2, -3', '2'],
            ['r', '%n ∙ %n', 'dot', '2, 3', '4, 5'],
            ['r', 'angle of %n', 'angle', '7, 7'],
            ['r', 'magnitude %n', 'magnitude', '3, 4'],
            ['r', '%n normalized', 'normalized', '3, 4'],
            ['r', 'unit at angle %n', 'unit', '45']
        ]
    };

    ScratchExtensions.register('2D Vector Math', descriptor, ext);
})({});