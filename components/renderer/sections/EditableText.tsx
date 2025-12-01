import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
    value: string;
    onChange: (newValue: string) => void;
    isEditable?: boolean;
    className?: string;
    style?: React.CSSProperties;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    placeholder?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
    value,
    onChange,
    isEditable = false,
    className,
    style,
    tagName = 'span',
    placeholder
}) => {
    const [text, setText] = useState(value || '');
    const contentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setText(value || '');
    }, [value]);

    const handleBlur = () => {
        if (contentRef.current) {
            const newText = contentRef.current.innerText;
            if (newText !== value) {
                onChange(newText);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            contentRef.current?.blur();
        }
    };

    const Tag = tagName as any;

    if (!isEditable) {
        return <Tag className={className} style={style}>{value || placeholder}</Tag>;
    }

    return (
        <Tag
            ref={contentRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`${className} outline-none focus:bg-blue-50/50 focus:ring-2 focus:ring-blue-500/20 rounded px-1 -mx-1 transition-all`}
            style={{ ...style, cursor: 'text' }}
        >
            {text || placeholder}
        </Tag>
    );
};
