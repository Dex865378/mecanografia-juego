// VELOCITY Dynamic Music System
// Uses Web Audio API to generate procedural background music

const MusicManager = {
    audioContext: null,
    isPlaying: false,
    oscillators: [],
    gainNodes: [],
    tempo: 120,
    noteIndex: 0,
    intervalId: null,

    // Scales
    scales: {
        cyberpunk: [110.00, 130.81, 146.83, 164.81, 196.00, 220.00], // A minor pentatonic ish
        zen: [261.63, 293.66, 329.63, 392.00, 440.00], // C major pentatonic
        danger: [110.00, 116.54, 130.81, 146.83, 155.56] // Phrygian ish
    },

    currentScale: 'cyberpunk',

    init() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    },

    start() {
        if (!this.audioContext) this.init();
        if (this.isPlaying) return;

        this.isPlaying = true;
        this.audioContext.resume();

        const secondsPerBeat = 60.0 / this.tempo;

        this.intervalId = setInterval(() => {
            this.playNote();
        }, secondsPerBeat * 1000 / 4); // 16th notes
    },

    stop() {
        this.isPlaying = false;
        clearInterval(this.intervalId);
        this.oscillators.forEach(osc => osc.stop());
        this.oscillators = [];
    },

    playNote() {
        if (!this.isPlaying) return;

        // Simple sequencer logic
        const scale = this.scales[this.currentScale];

        // Bass line (every beat)
        if (this.noteIndex % 4 === 0) {
            this.playTone(scale[0] / 2, 'square', 0.1, 0.1);
        }

        // Melody (random)
        if (Math.random() > 0.6) {
            const note = scale[Math.floor(Math.random() * scale.length)];
            this.playTone(note * 2, 'sine', 0.05, 0.1);
        }

        // Hi-hat (every off-beat)
        if (this.noteIndex % 2 !== 0) {
            this.playNoise(0.05);
        }

        this.noteIndex++;
    },

    playTone(freq, type, duration, vol) {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(vol, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start();
        osc.stop(this.audioContext.currentTime + duration);
    },

    playNoise(duration) {
        const bufferSize = this.audioContext.sampleRate * duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;

        const gain = this.audioContext.createGain();
        gain.gain.value = 0.05;

        noise.connect(gain);
        gain.connect(this.audioContext.destination);

        noise.start();
    },

    setTheme(theme) {
        if (this.scales[theme]) {
            this.currentScale = theme;
        }
    },

    setTempo(bpm) {
        this.tempo = bpm;
        if (this.isPlaying) {
            this.stop();
            this.start();
        }
    }
};
