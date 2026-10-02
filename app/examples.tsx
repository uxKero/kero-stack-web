'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown2, InfoCircle, Lock1, TickCircle } from 'iconsax-reactjs';
import type { Lang, Scene } from './content';

type Pair = { bad: React.ReactNode; good: React.ReactNode };

const L = (lang: Lang, en: string, es: string) => (lang === 'es' ? es : en);

function NativeGood({ lang }: { lang: Lang }) {
  const sizes = ['50 g', '100 g', '250 g'];
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(1);
  const [hi, setHi] = useState(1);
  const [gift, setGift] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const leave = (e: FocusEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', away);
    document.addEventListener('focusin', leave);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('focusin', leave);
    };
  }, [open]);
  const pick = (k: number) => {
    setSize(k);
    setOpen(false);
  };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHi(size);
        return;
      }
      setHi((h) => (h + (e.key === 'ArrowDown' ? 1 : -1) + sizes.length) % sizes.length);
    } else if (e.key === 'Enter' && open) {
      e.preventDefault();
      pick(hi);
    } else if (e.key === 'Escape') setOpen(false);
  };
  return (
    <div className="ex-native ex-native-made">
      <div className="nx-select" ref={box} onKeyDown={key}>
        <span className="nx-label">{L(lang, 'Size', 'Tamaño')}</span>
        <button type="button" className={`nx-trigger ${open ? 'is-open' : ''}`} onClick={() => { setOpen((o) => !o); setHi(size); }} aria-haspopup="listbox" aria-expanded={open}>
          <span>{sizes[size]}</span>
          <ArrowDown2 size={16} className="nx-chev" />
        </button>
        {open && (
          <ul className="nx-list" role="listbox" aria-label={L(lang, 'Size', 'Tamaño')}>
            {sizes.map((v, k) => (
              <li key={v} role="option" aria-selected={k === size} className={`${k === hi ? 'is-hi' : ''}`} onMouseEnter={() => setHi(k)} onClick={() => pick(k)}>
                {v}
                {k === size && <TickCircle size={16} variant="Bold" />}
              </li>
            ))}
          </ul>
        )}
      </div>
      <label className="nx-check">
        <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
        <span className="nx-box" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14">
            <path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" />
          </svg>
        </span>
        {L(lang, 'Gift wrap', 'Envolver para regalo')}
      </label>
      <div className="nx-scroll-wrap">
        <div className="nx-scroll">
          {[1, 2, 3, 4, 5, 6].map((k) => (
            <p key={k}>
              <span>{L(lang, 'Order', 'Pedido')} #{1040 + k}</span>
              <span>$ {(8400 + k * 350).toLocaleString('es-AR')}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Nav({ lang, kind }: { lang: Lang; kind: 'stripe' | 'fill' }) {
  const items = [L(lang, 'Orders', 'Pedidos'), L(lang, 'Products', 'Productos'), L(lang, 'Customers', 'Clientes')];
  const [on, setOn] = useState(1);
  const list = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  useEffect(() => {
    if (kind !== 'fill') return;
    const li = list.current?.children[on + 1] as HTMLElement | undefined;
    if (li) setPill({ x: li.offsetLeft, w: li.offsetWidth });
  }, [on, kind]);
  return (
    <ul ref={list} className={`ex-nav ex-nav-${kind}`}>
      {kind === 'fill' && <li className="ex-nav-pill" aria-hidden="true" style={pill ? { transform: `translateX(${pill.x}px)`, width: pill.w } : { opacity: 0 }} />}
      {items.map((it, k) => (
        <li key={it} className={k === on ? 'is-on' : ''}>
          <button type="button" onClick={() => setOn(k)}>
            {it}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Undo({ lang, good }: { lang: Lang; good: boolean }) {
  const [gone, setGone] = useState(false);
  const [ask, setAsk] = useState(false);
  const item = L(lang, 'Smoked tea', 'Té ahumado');
  if (good)
    return gone ? (
      <div className="ex-toast">
        <span>{L(lang, 'Smoked tea removed', 'Té ahumado quitado')}</span>
        <button type="button" className="ex-undo" onClick={() => setGone(false)}>
          {L(lang, 'Undo', 'Deshacer')}
        </button>
      </div>
    ) : (
      <div className="ex-row-item">
        <span>{item}</span>
        <button type="button" className="ex-btn-ghost" onClick={() => setGone(true)}>
          {L(lang, 'Remove', 'Quitar')}
        </button>
      </div>
    );
  if (gone)
    return (
      <div className="ex-gone">
        <p>{L(lang, 'Item removed. This cannot be undone.', 'Producto quitado. No se puede deshacer.')}</p>
        <button type="button" className="ex-btn-ghost" onClick={() => setGone(false)}>
          {L(lang, 'Start over', 'Empezar de nuevo')}
        </button>
      </div>
    );
  return ask ? (
    <div className="ex-dialog">
      <p>{L(lang, 'Are you sure you want to remove this item?', '¿Seguro que quieres quitar este producto?')}</p>
      <div>
        <button type="button" className="ex-btn-ghost" onClick={() => setAsk(false)}>
          {L(lang, 'Cancel', 'Cancelar')}
        </button>
        <button type="button" className="ex-cta" onClick={() => { setAsk(false); setGone(true); }}>
          {L(lang, 'Yes, remove', 'Sí, quitar')}
        </button>
      </div>
    </div>
  ) : (
    <div className="ex-row-item">
      <span>{item}</span>
      <button type="button" className="ex-cta" onClick={() => setAsk(true)}>
        {L(lang, 'Remove', 'Quitar')}
      </button>
    </div>
  );
}

function PostCode({ lang, good }: { lang: Lang; good: boolean }) {
  const [v, setV] = useState('76OO');
  const [sent, setSent] = useState(false);
  const bad = !/^\d{4}$/.test(v);
  return (
    <form
      className="ex-field"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {!good && sent && bad && <span className="ex-banner">{L(lang, 'Error 422: invalid input.', 'Error 422: entrada inválida.')}</span>}
      <label className="ex-label" htmlFor={`pc-${good}`}>
        {L(lang, 'Postal code', 'Código postal')}
      </label>
      <input id={`pc-${good}`} className={`ex-input ${good && bad ? 'ex-invalid' : ''}`} value={v} onChange={(e) => { setV(e.target.value); setSent(false); }} />
      {good && bad && <span className="ex-fix">{L(lang, 'Use numbers only, like 7600. The O looks like a zero.', 'Usa solo números, como 7600. La O parece un cero.')}</span>}
      {(!bad || !good) && (
        <button type="submit" className={good ? 'ex-cta' : 'ex-cta'}>
          {sent && !bad ? L(lang, 'Saved', 'Guardado') : L(lang, 'Save', 'Guardar')}
        </button>
      )}
    </form>
  );
}

function Effect({ lang, live }: { lang: Lang; live: boolean }) {
  const [r, setR] = useState(12);
  const [saved, setSaved] = useState(12);
  return (
    <div className="ex-effect">
      <div className="ex-tile" style={{ borderRadius: live ? r : saved }} />
      <label className="ex-slider">
        <span>{L(lang, 'Corner radius', 'Radio de esquina')}</span>
        <input type="range" min={0} max={40} value={r} onChange={(e) => setR(Number(e.target.value))} />
      </label>
      {!live && <p className="ex-help">{L(lang, 'This setting changes how rounded the corners of every card in your store will look once you save.', 'Este ajuste cambia qué tan redondeadas se verán las esquinas de las tarjetas de tu tienda cuando guardes.')}</p>}
      {!live && (
        <button type="button" className="ex-cta ex-save" onClick={() => setSaved(r)}>
          {L(lang, 'Save changes', 'Guardar cambios')}
        </button>
      )}
    </div>
  );
}

function pairs(lang: Lang): Record<Scene, Pair> {
  return {
    state: { bad: <Nav lang={lang} kind="stripe" />, good: <Nav lang={lang} kind="fill" /> },
    size: {
      bad: (
        <div className="ex-field ex-small">
          <span className="ex-label">{L(lang, 'Delivery window', 'Franja de entrega')}</span>
          <span className="ex-input">9:00 to 13:00</span>
          <span className="ex-note">{L(lang, 'Orders after 18:00 ship tomorrow', 'Lo pedido después de las 18 sale mañana')}</span>
        </div>
      ),
      good: (
        <div className="ex-field">
          <span className="ex-label">{L(lang, 'Delivery window', 'Franja de entrega')}</span>
          <span className="ex-input">9:00 to 13:00</span>
          <span className="ex-note">{L(lang, 'Orders after 18:00 ship tomorrow', 'Lo pedido después de las 18 sale mañana')}</span>
        </div>
      ),
    },
    digits: {
      bad: (
        <ul className="ex-prices ex-prices-old">
          <li><span>{L(lang, 'Smoked', 'Ahumado')}</span><span>$ 11.180</span></li>
          <li><span>{L(lang, 'Citrus', 'Cítrico')}</span><span>$ 8.400</span></li>
          <li><span>{L(lang, 'Floral', 'Floral')}</span><span>$ 1.090</span></li>
        </ul>
      ),
      good: (
        <ul className="ex-prices">
          <li><span>{L(lang, 'Smoked', 'Ahumado')}</span><span>$ 11.180</span></li>
          <li><span>{L(lang, 'Citrus', 'Cítrico')}</span><span>$ 8.400</span></li>
          <li><span>{L(lang, 'Floral', 'Floral')}</span><span>$ 1.090</span></li>
        </ul>
      ),
    },
    effect: { bad: <Effect lang={lang} live={false} />, good: <Effect lang={lang} live /> },
    disabled: {
      bad: (
        <div className="ex-actions">
          <button type="button" className="ex-btn" disabled>
            {L(lang, 'Export', 'Exportar')}
          </button>
        </div>
      ),
      good: (
        <div className="ex-actions">
          <button type="button" className="ex-btn" disabled>
            <Lock1 size={16} />
            {L(lang, 'Export', 'Exportar')}
          </button>
          <span className="ex-reason">{L(lang, 'Add a payment method to export', 'Agrega un medio de pago para exportar')}</span>
        </div>
      ),
    },
    info: {
      bad: (
        <div className="ex-field">
          <span className="ex-label">{L(lang, 'Store handle', 'Nombre de la tienda')}</span>
          <span className="ex-input">lumbre</span>
          <p className="ex-help">{L(lang, 'Your handle is the short name people see in links to your store. It can only contain letters and numbers, it must be unique, and changing it later breaks links you already shared.', 'Es el nombre corto que la gente ve en los enlaces de tu tienda. Solo admite letras y números, tiene que ser único y cambiarlo después rompe los enlaces que ya compartiste.')}</p>
        </div>
      ),
      good: (
        <div className="ex-field">
          <span className="ex-label">
            {L(lang, 'Store handle', 'Nombre de la tienda')}
            <span className="ex-info" tabIndex={0} aria-label={L(lang, 'Letters and numbers only. Changing it breaks shared links.', 'Solo letras y números. Cambiarlo rompe los enlaces compartidos.')}>
              <InfoCircle size={16} />
              <span className="ex-tip">{L(lang, 'Letters and numbers only. Changing it breaks shared links.', 'Solo letras y números. Cambiarlo rompe los enlaces compartidos.')}</span>
            </span>
          </span>
          <span className="ex-input">lumbre</span>
        </div>
      ),
    },
    native: {
      bad: (
        <div className="ex-native ex-native-raw">
          <select defaultValue="b" aria-label={L(lang, 'Size', 'Tamaño')}>
            <option value="a">50 g</option>
            <option value="b">100 g</option>
            <option value="c">250 g</option>
          </select>
          <label>
            <input type="checkbox" defaultChecked /> {L(lang, 'Gift wrap', 'Envolver para regalo')}
          </label>
          <div className="ex-scroll">
            {[1, 2, 3, 4, 5, 6].map((k) => (
              <p key={k}>{L(lang, 'Order', 'Pedido')} #{1040 + k}</p>
            ))}
          </div>
        </div>
      ),
      good: <NativeGood lang={lang} />,
    },
    generic: {
      bad: (
        <div className="ex-grid">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <span key={k}>
              <i />
              <b />
            </span>
          ))}
        </div>
      ),
      good: (
        <div className="ex-feature">
          <i />
          <div>
            <span className="ex-kicker">{L(lang, 'Tasted at the fair', 'Lo probaste en la feria')}</span>
            <span className="ex-name">{L(lang, 'Smoked, high mountain', 'Ahumado de altura')}</span>
            <button type="button" className="ex-cta">{L(lang, 'Reorder', 'Repetir')}</button>
          </div>
        </div>
      ),
    },
    radius: {
      bad: (
        <div className="ex-nest" style={{ borderRadius: 40 }}>
          <div className="ex-nest-in" style={{ borderRadius: 40 }}>
            {L(lang, 'Smoked tea', 'Té ahumado')}
          </div>
        </div>
      ),
      good: (
        <div className="ex-nest" style={{ borderRadius: 40 }}>
          <div className="ex-nest-in" style={{ borderRadius: 24 }}>
            {L(lang, 'Smoked tea', 'Té ahumado')}
          </div>
        </div>
      ),
    },
    space: {
      bad: (
        <ul className="ex-list ex-boxed">
          <li>{L(lang, 'Smoked', 'Ahumado')}</li>
          <li>{L(lang, 'Citrus', 'Cítrico')}</li>
          <li>{L(lang, 'Floral', 'Floral')}</li>
        </ul>
      ),
      good: (
        <ul className="ex-list ex-spaced">
          <li>{L(lang, 'Smoked', 'Ahumado')}</li>
          <li>{L(lang, 'Citrus', 'Cítrico')}</li>
          <li>{L(lang, 'Floral', 'Floral')}</li>
        </ul>
      ),
    },
    scale: {
      bad: (
        <div className="ex-stack" style={{ gap: 0 }}>
          <span className="ex-name" style={{ marginBottom: 1 }}>{L(lang, 'Smoked tea', 'Té ahumado')}</span>
          <span className="ex-price" style={{ marginBottom: 31 }}>$ 9.800</span>
          <span className="ex-note" style={{ marginBottom: 3 }}>{L(lang, 'Arrives Thursday', 'Llega el jueves')}</span>
          <button type="button" className="ex-cta">{L(lang, 'Add to cart', 'Agregar')}</button>
        </div>
      ),
      good: (
        <div className="ex-stack" style={{ gap: 0 }}>
          <span className="ex-name" style={{ marginBottom: 4 }}>{L(lang, 'Smoked tea', 'Té ahumado')}</span>
          <span className="ex-price" style={{ marginBottom: 16 }}>$ 9.800</span>
          <span className="ex-note" style={{ marginBottom: 8 }}>{L(lang, 'Arrives Thursday', 'Llega el jueves')}</span>
          <button type="button" className="ex-cta">{L(lang, 'Add to cart', 'Agregar')}</button>
        </div>
      ),
    },
    shadow: {
      bad: (
        <div className="ex-shadows">
          <span style={{ boxShadow: '-8px -6px 14px rgba(0,0,0,.25)' }} />
          <span style={{ boxShadow: '10px 2px 0 rgba(0,0,0,.4)' }} />
          <span style={{ boxShadow: '0 -10px 30px rgba(124,58,237,.5)' }} />
        </div>
      ),
      good: (
        <div className="ex-shadows">
          <span style={{ boxShadow: '0 1px 2px rgba(17,17,17,.12)' }} />
          <span style={{ boxShadow: '0 4px 10px -2px rgba(17,17,17,.18)' }} />
          <span style={{ boxShadow: '0 14px 30px -8px rgba(17,17,17,.28)' }} />
        </div>
      ),
    },
    measure: {
      bad: (
        <p className="ex-measure" style={{ maxWidth: '100%' }}>
          {L(lang, 'Our teas are picked at altitude and roasted every Tuesday in small batches, then packed the same day so they reach you within 48 hours anywhere in the country.', 'Nuestros tés se cosechan en altura y se tuestan cada martes en tandas chicas, y se empacan el mismo día para que lleguen en 48 horas a cualquier lugar del país.')}
        </p>
      ),
      good: (
        <p className="ex-measure" style={{ maxWidth: '34ch' }}>
          {L(lang, 'Our teas are picked at altitude and roasted every Tuesday in small batches, then packed the same day so they reach you within 48 hours anywhere in the country.', 'Nuestros tés se cosechan en altura y se tuestan cada martes en tandas chicas, y se empacan el mismo día para que lleguen en 48 horas a cualquier lugar del país.')}
        </p>
      ),
    },
    undo: { bad: <Undo lang={lang} good={false} />, good: <Undo lang={lang} good /> },
    errors: { bad: <PostCode lang={lang} good={false} />, good: <PostCode lang={lang} good /> },
    optical: {
      bad: (
        <span className="ex-play">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M6 4 L20 12 L6 20 Z" fill="currentColor" transform="translate(-1 0)" />
          </svg>
        </span>
      ),
      good: (
        <span className="ex-play">
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M6 4 L20 12 L6 20 Z" fill="currentColor" transform="translate(1.5 0)" />
          </svg>
        </span>
      ),
    },
    primary: {
      bad: (
        <div className="ex-row">
          <button type="button" className="ex-cta">{L(lang, 'Save draft', 'Guardar borrador')}</button>
          <button type="button" className="ex-cta">{L(lang, 'Preview', 'Vista previa')}</button>
          <button type="button" className="ex-cta">{L(lang, 'Publish', 'Publicar')}</button>
        </div>
      ),
      good: (
        <div className="ex-row">
          <button type="button" className="ex-btn-ghost">{L(lang, 'Save draft', 'Guardar borrador')}</button>
          <button type="button" className="ex-btn-ghost">{L(lang, 'Preview', 'Vista previa')}</button>
          <button type="button" className="ex-cta">{L(lang, 'Publish', 'Publicar')}</button>
        </div>
      ),
    },
    ornament: {
      bad: (
        <div className="ex-product ex-loud">
          <span className="ex-badges">
            <em>NEW</em>
            <em>🔥 HOT</em>
            <em>-10%</em>
          </span>
          <span className="ex-name">✨ {L(lang, 'Smoked tea', 'Té ahumado')} ✨</span>
          <span className="ex-stars">★★★★★ 4.9 (2.3k)</span>
          <button type="button" className="ex-cta">{L(lang, 'Add to cart 🛒', 'Agregar 🛒')}</button>
        </div>
      ),
      good: (
        <div className="ex-product">
          <span className="ex-name">{L(lang, 'Smoked tea', 'Té ahumado')}</span>
          <span className="ex-price">$ 9.800</span>
          <button type="button" className="ex-cta">{L(lang, 'Add to cart', 'Agregar')}</button>
        </div>
      ),
    },
  };
}

export function Example({ lang, scene, avoid, doLabel }: { lang: Lang; scene: Scene; avoid: string; doLabel: string }) {
  const p = pairs(lang)[scene];
  return (
    <div className="example">
      <div className="example-pane is-bad">
        <p className="example-tag">✕ {avoid}</p>
        <div className="example-stage">
          {p.bad}
        </div>
      </div>
      <div className="example-pane is-good">
        <p className="example-tag">✓ {doLabel}</p>
        <div className="example-stage">{p.good}</div>
      </div>
    </div>
  );
}
