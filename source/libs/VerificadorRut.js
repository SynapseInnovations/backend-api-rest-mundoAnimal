const validateRUT = (rut) =>{
        if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;
        var tmp = rut.split("-");
        var digv = tmp[1];
        var rut = tmp[0];

        if (digv == "K") digv = "k";

        var suma = 0;
        var factor = 2;

        for (var i = rut.length - 1; i >= 0; i--) {
            suma += factor * rut.charAt(i);
            factor = factor == 7 ? 2 : factor + 1;
        }

        var dv = 11 - (suma % 11);
        if (dv == 10) {
            return digv == "k" || digv == "K";
        } else if (dv == 11) {
            return digv == "0";
        } else {
            return dv == parseInt(digv);
        }
}

module.exports = { validateRUT }

