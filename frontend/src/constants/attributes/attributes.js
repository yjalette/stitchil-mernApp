import colors from "../colors";
import necklines from "./neckline_types";
import silhouettes from "./silhouette_types";
import sleeves from "./sleeve_types";
import pockets from "./pocket_types";
import fits from "./fit_types";
import jacket_types from "./jacket_types";
import fabrics from "../fabrics";

export const attributes = {
    make: {
        dress: {
            primary_fabric: {
                options: fabrics,
                required: false
            },
            secondary_fabric: {
                options: fabrics,
                required: false
            },
            primary_color: {
                options: colors,
                required: false
            },
            secondary_color: {
                options: colors,
                required: false
            },
            neckline_type: {
                options: necklines,
                required: false
            },
            silhouette_type: {
                options: silhouettes,
                required: false
            },
            sleeve_type: {
                options: sleeves,
                required: false
            },
            pocket_type: {
                options: pockets,
                required: false
            }
        },
        jacket: {
            primary_fabric: {
                options: fabrics,
                required: false
            },
            secondary_fabric: {
                options: fabrics,
                required: false
            },
            primary_color: {
                options: colors,
                required: false
            },
            secondary_color: {
                options: colors,
                required: false
            },
            neckline_type: {
                options: necklines,
                required: true
            },
            sleeve_type: {
                options: sleeves,
                required: false
            },
            pocket_type: {
                options: pockets,
                required: false
            },
            jacket_type: {
                options: jacket_types,
                required: false
            }
        },
        pants: {
            pocket_type: {
                options: pockets,
                required: false
            },
            fit_type: {
                options: fits,
                required: false
            },
        }
    }
}
