class Helper {
    
    static validatingFields(value) {
        if (value) return value;

        switch (typeof value) {
            case "number":
                return 0;
            default:
                return "";
        }
    }
}

export default Helper;