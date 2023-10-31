export const getText = (isRecording: boolean = true) => {
  return {
    trigger: isRecording ? '停止' : '録画',
    title: isRecording ? '停止' : '開始',
    action: isRecording ? '停止' : '開始',
  };
};
