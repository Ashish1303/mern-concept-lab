import { useState, useLayoutEffect, useRef } from 'react';
import { Result } from './LabWidgets';
import { useLab } from './lab-context';
import { useLabStyle } from './use-lab-style';
function StyleBadge({ color }: {
    color: 'green' | 'purple';
}) { const className = useLabStyle(color); return <p className={className}>{color} owned badge</p>; }
export function Example01() {
    const [color, setColor] = useState<'green' | 'purple'>('green');
    const className = useLabStyle(color);
    const node = useRef<HTMLParagraphElement>(null);
    const { trace } = useLab();
    useLayoutEffect(() => {
        const style = document.querySelector<HTMLStyleElement>(`style[data-mern-rule="${className}"]`);
        const nonce = document.querySelector<HTMLMetaElement>('meta[name="csp-nonce"]')?.content;
        trace.emit('style observed in layout', {
            installed: !!style,
            color: node.current ? getComputedStyle(node.current).color : null,
            nonceRequired: !!nonce,
            nonceMatchesPage: nonce ? style?.nonce === nonce : null
        });
    }, [className, color, trace]);
    return <><button onClick={() => setColor(value => value === 'green' ? 'purple' : 'green')}>Change inserted color</button><p ref={node} className={className}>Actual injected style</p><Result value={{ color }}/></>;
}
export function Example02() {
    const [second, setSecond] = useState(true);
    const [rules, setRules] = useState<number | null>(null);
    return <><StyleBadge color="green"/>{second && <StyleBadge color="purple"/>}<button onClick={() => setSecond(value => !value)}>Toggle owned style</button><button onClick={() => setRules(document.querySelectorAll('style[data-mern-rule]').length)}>Inspect owned styles</button><Result value={{ rules }}/></>;
}
