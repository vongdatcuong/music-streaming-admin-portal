// Get duration of audio file in milliseconds
export const getAudioFileDuration = (
  file: Blob | MediaSource
): Promise<number> => {
  return new Promise((resolve) => {
    const objectURL = URL.createObjectURL(file);
    const audio = new Audio(objectURL);
    audio.addEventListener(
      'canplaythrough',
      () => {
        URL.revokeObjectURL(objectURL);
        resolve(audio.duration * 1000);
      },
      false
    );
  });
};
