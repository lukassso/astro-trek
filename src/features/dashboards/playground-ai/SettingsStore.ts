import { makeAutoObservable } from "mobx";
import type { SettingsStoreType } from "./types";

class SettingsStore {
  private state: SettingsStoreType = {
    temperature: 1,
    maxTokens: 256,
    topP: 0.5,
    frequencyPenalty: 0,
    presencePenalty: 0,
  };

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
    this.loadSettings();
  }

  // Getters
  get config() {
    return {
      temperature: this.state.temperature,
      maxTokens: this.state.maxTokens,
      topP: this.state.topP,
      frequencyPenalty: this.state.frequencyPenalty,
      presencePenalty: this.state.presencePenalty,
    };
  }

  get temperature() {
    return this.state.temperature;
  }

  get maxTokens() {
    return this.state.maxTokens;
  }

  get topP() {
    return this.state.topP;
  }

  get frequencyPenalty() {
    return this.state.frequencyPenalty;
  }

  get presencePenalty() {
    return this.state.presencePenalty;
  }

  // Setters
  set temperature(value: number) {
    this.state.temperature = value;
    this.saveSettings();
  }

  set maxTokens(value: number) {
    this.state.maxTokens = value;
    this.saveSettings();
  }

  set topP(value: number) {
    this.state.topP = value;
    this.saveSettings();
  }

  set frequencyPenalty(value: number) {
    this.state.frequencyPenalty = value;
    this.saveSettings();
  }

  set presencePenalty(value: number) {
    this.state.presencePenalty = value;
    this.saveSettings();
  }

  // Methods to save and load settings
  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.state));
  }

  loadSettings() {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.state.temperature = settings.temperature;
      this.state.maxTokens = settings.maxTokens;
      this.state.topP = settings.topP;
      this.state.frequencyPenalty = settings.frequencyPenalty;
      this.state.presencePenalty = settings.presencePenalty;
    }
  }
}

const settingsStore = new SettingsStore();
export default settingsStore;
