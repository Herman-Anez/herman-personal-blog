'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { getDictionary } from '@/shared/i18n/dictionaries';

interface TProps {
  id?: string;
  [key: string]: React.ReactNode;
}

const getNestedValue = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

/**
 * Hook useT
 * Permite obtener la traducción como un string o nodo React fuera del renderizado JSX.
 * Útil para props como 'alt', 'title', 'placeholder'.
 */
export const useT = () => {
  const params = useParams();
  const locale = (params?.locale as string) || 'es';

  const t = (props: TProps): any => {
    if (props.id) {
      const dictCurrent = getDictionary(locale);
      const dictBase = getDictionary('es');
      const value = getNestedValue(dictCurrent, props.id) || getNestedValue(dictBase, props.id);

      return value || props['es'] || props['en'] || props.children || `[${props.id}]`;
    }

    return props[locale] || props['es'] || props['en'] || Object.values(props)[0] || null;
  };

  return { t, locale };
};

/**
 * Componente T (Translate)
 * Renderiza el contenido basado en el locale actual de la URL.
 * Soporta IDs de diccionario o contenido inline.
 * Uso ID: <T id="blog.title" />
 * Uso Inline: <T es="Texto" en="Text" />
 */
export const T: React.FC<TProps> = (props) => {
  const { t } = useT();
  return <>{t(props)}</>;
};

T.displayName = 'T';
