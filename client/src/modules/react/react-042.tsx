import { useActionState, startTransition } from 'react';
import { Result } from './LabWidgets';
import { useOwnedRequests, acknowledge } from './lab-context';
export function Example01() {
    const request = useOwnedRequests();
    const [state, action, pending] = useActionState(async (_previous: {
        status: string;
        name: string;
    }, data: FormData) => { const name = String(data.get('name') ?? '').trim(); if (!name)
        return { status: 'Enter a name.', name: '' }; try {
        return { status: 'acknowledged', name: await acknowledge(request, name, data.get('fail') === 'on') };
    }
    catch (error) {
        return { status: error instanceof Error ? error.message : 'Request failed.', name: '' };
    } }, { status: 'idle', name: '' });
    return <><form action={action}><label>Action name<input name="name" maxLength={40} defaultValue="Ada"/></label><label><input name="fail" type="checkbox"/>Reject action request</label><button disabled={pending}>Submit action</button></form><Result value={{ ...state, pending }}/></>;
}
export function Example02() {
    const request = useOwnedRequests();
    const [state, dispatch, pending] = useActionState(async (previous: {
        total: number;
        error: string;
    }, amount: number) => { try {
        await acknowledge(request, String(amount));
        return { total: previous.total + amount, error: '' };
    }
    catch (error) {
        return { ...previous, error: error instanceof Error ? error.message : 'Request failed.' };
    } }, { total: 0, error: '' });
    return <><button disabled={pending} onClick={() => startTransition(() => { dispatch(1); dispatch(2); })}>Queue two actions</button><Result value={{ ...state, pending }}/></>;
}
