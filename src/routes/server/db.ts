export function getDB(platform: App.Platform | undefined){
    if (!platform) throw new Error('Platform not available');
    return platform.env.users;
}