import { Entity } from "../common/entity.abstract";

type PresetCriteriaId = string
export default class PresetCriteria extends Entity<PresetCriteriaId> {
    constructor(
        private presetCriteriaId: PresetCriteriaId,
    ) {
        super(presetCriteriaId)
    }
}