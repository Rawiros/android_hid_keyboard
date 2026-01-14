import { promisify } from 'node:util';
import { exec as execCallback } from 'node:child_process';

const execAsync = promisify(execCallback);

export async function setProp(name: string, value: string): Promise<void> {
    await execAsync(`/system/bin/setprop ${name} ${value}`);
}