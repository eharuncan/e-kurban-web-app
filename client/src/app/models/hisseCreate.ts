import {Hissedar} from "./hissedar";
import {HissedarCreate} from "./hissedarCreate";

export interface HisseCreate {
    kurbanId: number;
    hissedarId?: number;
    hissedarCreate?: HissedarCreate;
}
