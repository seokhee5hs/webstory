import Workspace from './workspace';
import {getChatGPTUser,chatGPTSignInPath,chatGPTSignOutPath} from './chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Home(){
 const user=await getChatGPTUser();
 return <Workspace signedIn={!!user} accountLink={<a className='button ghost' href={user?chatGPTSignOutPath('/'):chatGPTSignInPath('/')} target='_top'>{user?'로그아웃':'ChatGPT로 로그인'}</a>}/>;
}
