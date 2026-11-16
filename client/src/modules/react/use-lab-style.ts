import { useId, useInsertionEffect } from 'react';
// A tiny CSS-in-JS library demonstration, not a general application styling hook.
export function useLabStyle(color: 'green' | 'purple') {
    const id = useId();
    const className = `mern-rule-${Array.from(id).map(character => character.codePointAt(0)!.toString(16)).join('-')}`;
    useInsertionEffect(() => {
        const style = document.createElement('style');
        const nonce = document.querySelector<HTMLMetaElement>('meta[name="csp-nonce"]')?.content;
        if (nonce)
            style.nonce = nonce;
        style.dataset.mernRule = className;
        style.textContent = `.${className}{color:${color === 'green' ? 'rgb(20, 100, 60)' : 'rgb(110, 40, 140)'};font-weight:700}`;
        document.head.append(style);
        return () => style.remove();
    }, [className, color]);
    return className;
}
