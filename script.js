import { Analyser, UserMedia, context, start } from 'tone';

await start();
const analyser = new Analyser();

import { PitchDetector } from 'pitchy';
import { Analyser, UserMedia, context, start } from 'tone';

await start();

setDevice(deviceName);

const getPitch = () => {
  const dataArray = analyser.getValue() as Float32Array;
  const frequency = PitchDetector.forFloat32Array(analyser.size);
  const [pitch, clarity] = frequency.findPitch(dataArray, context.sampleRate);
  const volumeDb = meter.getValue() as number;
  const inputVolume = Math.min(
    100,
    Math.max(0, ((volumeDb - minVolume) / (maxVolume - minVolume)) * 100),
  );

  const isCaptureRange = pitch !== 0 && clarity > 0.96 && inputVolume !== 0;

  if (isCaptureRange) {
    const closestNote = getClosestNote(pitch, mode);

    if (closestNote !== null) {
      const referencePitch = tuning[closestNote];
      const difference = referencePitch
        ? Math.abs(referencePitch - pitch)
        : 0;
      const isInTune = difference <= deviation;

      setIsInTune(isInTune);
    }

    setNote(closestNote);
    setPitch(pitch);
  }

  requestAnimationFrame(getPitch);
};

getPitch();