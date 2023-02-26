import * as alt from 'alt-server';

const tempVehicles: Array<number> = [];
const tempOwnedVehicles: { [vehicle_id: string]: number } = {};
const deleteOnLeave: { [vehicle_id: string]: true } = {};

/**
 * Register a vehicle as temporary
 *
 * @export
 * @param {alt.Vehicle} vehicle
 * @param {{ owner?: number; deleteOnLeave?: boolean }} options
 */
export function add(vehicle: alt.Vehicle, options: { owner?: number; deleteOnLeave?: boolean }) {
    tempVehicles.push(vehicle.id);

    if (typeof options.owner !== 'undefined') {
        tempOwnedVehicles[vehicle.id] = options.owner;
    }

    if (options.deleteOnLeave) {
        deleteOnLeave[vehicle.id] = true;
    }
}

/**
 * Removes a temporary vehicle from the tracker.
 *
 * @export
 * @param {number} id
 */
export function remove(id: number): void {
    for (let i = tempVehicles.length - 1; i >= 0; i--) {
        if (tempVehicles[i] !== id) {
            continue;
        }

        tempVehicles.splice(i, 1);
    }

    delete tempOwnedVehicles[id];
    delete deleteOnLeave[id];
}

/**
 * Check if a vehicle is temporary by id, or vehicle instance.
 *
 * @export
 * @param {alt.Vehicle | number} vehicle
 * @return {boolean}
 */
export function has(vehicle: alt.Vehicle | number): boolean {
    const id = vehicle instanceof alt.Vehicle ? vehicle.id : vehicle;
    return tempVehicles.findIndex((x) => x === id) >= 0;
}

/**
 * Check if player is owner of a temporary vehicle.
 *
 * @export
 * @param {alt.Vehicle} player
 * @param {alt.Vehicle} vehicle
 * @return
 */
export function isOwner(player: alt.Player, vehicle: alt.Vehicle): boolean {
    if (typeof tempOwnedVehicles[vehicle.id] === 'undefined') {
        return true;
    }

    return tempOwnedVehicles[vehicle.id] === player.id;
}

/**
 * Check if this vehicle should be removed when a player leaves the drivers seat.
 *
 * @export
 * @param {alt.Vehicle} vehicle
 * @return {boolean}
 */
export function shouldBeDestroyed(vehicle: alt.Vehicle): boolean {
    return typeof deleteOnLeave[vehicle.id] !== 'undefined';
}
