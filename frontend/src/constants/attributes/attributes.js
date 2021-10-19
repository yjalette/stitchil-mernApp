import colors from "../colors";
import necklines from "./neckline_types";
import silhouettes from "./silhouette_types";
import sleeves from "./sleeve_types";
import pockets from "./pocket_types";
import fits from "./fit_types";
import jacket_types from "./jacket_types";


export const attributes = {
    dress: {
        neckline_type: necklines,
        silhouette_type: silhouettes,
        sleeve_type: sleeves,
        pocket_type: pockets,
        fit_type: fits,
    },
    jacket: {
        neckline_type: necklines,
        sleeve_type: sleeves,
        pocket_type: pockets,
        jacket_type: jacket_types
    },
    pants: {
        pocket_type: pockets,
        fit_type: fits
    }
}

export const dress = {
    neckline_type: necklines,
    silhouette_type: silhouettes,
    sleeve_type: sleeves,
    pocket_type: pockets,
    fit_type: fits,
}


export const jacket = {
    neckline_type: necklines,
    sleeve_type: sleeves,
    pocket_type: pockets,
    jacket_type: jacket_types
}

export const pants = {
    pocket_type: pockets,
    fit_type: fits
}