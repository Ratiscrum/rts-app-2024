import { WaveformPlayer } from '@/components/waveform';

export default function Page() {
  return (
    <div className="my-12 flex flex-col gap-6">
      <h1>Podcast</h1>

      <p>Interview de Frederic Le Moigne, océanographe au CNRS.</p>

      <WaveformPlayer audio="" />
    </div>
  );
}
