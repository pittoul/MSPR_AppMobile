export const constraints = {
    addressEmail: {
        email: {
            message: "n'est pas valide."
        }
    },
    motDePasse: {
        equality: {
            attribute: "password",
            message: "est différent.",
            comparator: function(v1, v2) {
                return v1 === v2;
            }
        }
    },
};
export default constraints;