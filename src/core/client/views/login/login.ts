import * as alt from 'alt-client';
import * as native from 'natives';
import { View } from '../../extensions/view';

const url = `http://resource/client/views/login/html/index.html`;
let view: View;
let discordURI: string;

alt.onServer('discord:Auth', handleView);
alt.onServer('discord:Close', handleClose);

async function handleView(oAuthUrl) {
    discordURI = oAuthUrl;

    if (!view) {
        view = await View.getInstance(url, true);
        view.on('discord:OpenURL', handleOpenURL);
    }
}

function handleOpenURL() {
    view.emit('discord:OpenURL', discordURI);
}

function handleClose() {
    if (!view) {
        return;
    }

    view.emit('discord:FadeToBlack');
    view.close(1200);

    alt.setTimeout(() => {
        native.doScreenFadeIn(2000);
    }, 1200);
}
