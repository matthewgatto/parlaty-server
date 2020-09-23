export const getStepValues  = (idx) => ({template}) => template[idx];
export const getStepFileList  = (idx) => ({template}) => template[idx].visuals;
export const getLastTemplate = ({template}) => template[template.length - 1];