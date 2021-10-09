import * as Cli from 'knict-cli'
import { CLIV } from './KnictBBSContants'

export class KnictCliService {

    @Cli.CliMethod.Input()
    login(@Cli.CliMethod.Str('username') username: string, @Cli.CliMethod.Password('password') password: string): any {
        return {
            username: '',
            password: ''
        }
    }

    @Cli.CliMethod.Choice(CLIV.msgHome, [CLIV.choiceHomeReply,CLIV.choiceHomePost, CLIV.choiceHomeHot])
    homeTag(...args: string[]):any {
        return args
    }

    @Cli.CliMethod.Choice('Choose your next tag', ["Home", "Message", "Board", "Profile"])
    bottomTag(...args: string[]):any {
        return args
    }

    @Cli.CliMethod.Choice(CLIV.msgAfterHome, [CLIV.choiceAfterHomeBack, CLIV.choiceAfterHomeNext, CLIV.choiceAfterHomePre])
    afterHomeTag():any {
        return arguments
    }
}



const knictCliService = Cli.Knict.builder(new Cli.CliClientBuilder())
    .create(new KnictCliService())
export {
    knictCliService
}