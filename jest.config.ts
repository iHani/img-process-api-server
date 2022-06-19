import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: "ts-jest",
    verbose: true,
    testEnvironment: "node",
    detectOpenHandles: true,
    testPathIgnorePatterns: ["build"],
  };
};
