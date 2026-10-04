import manifest from '../stretch3-base/extensions-manifest.json' with {type:'json'};
import policies from './extension-policies.json' with {type:'json'};
export function extensionRegistry(isLoaded){return policies.filter(policy=>!import.meta.env?.VITE_PUBLIC_BUILD||policy.id!=='cameraselector').map(policy=>({...manifest.find(info=>info.id===policy.id),...policy,loaded:!!isLoaded(policy.id)}));}
export function loadedExtensions(isLoaded){return extensionRegistry(isLoaded).filter(info=>info.loaded);}
