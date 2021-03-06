import {enumToOptions} from "@/services";
import CommonStatus from "@/services/enums/CommonStatus";

export const CommonMixin = {
    data() {
        return {
            CommonStatus: CommonStatus.getInstance()
        }
    },
    methods: {
        enumToOptions
    }
}