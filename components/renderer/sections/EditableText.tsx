import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
    value: string;
    onChange: (newValue: string) => void;
    isEditable?: boolean;
    className?: string;
    style?: React.CSSProperties;
    tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    placeholder?: string;
    multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
    value,
    onChange,
    isEditable = false,
    className,
    style,
    tagName = 'span',
    placeholder,
    multiline = false
}) => {
    const [text, setText] = useState(value || '');
    const [isFocused, setIsFocused] = useState(false);
    const contentRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setText(value || '');
    }, [value]);

    const handleBlur = () => {
        setIsFocused(false);
        if (contentRef.current) {
            const newText = contentRef.current.innerText;
            if (newText !== value) {
                onChange(newText);
            }
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            contentRef.current?.blur();
        }
    };

    const Tag = tagName as any;

    const isEmpty = !value && !text;
    const displayValue = text || '';

    if (!isEditable) {
        return (
            <Tag className={className} style={style}>
                {value || <span className="text-gray-400 italic">{placeholder}</span>}
            </Tag>
        );
    }

    // Gold standard wrapper approach: wrapper handles all visual feedback,
    // contentEditable element stays inline without layout-breaking padding/margin
    return (
        <div
            className={`
                inline-block
                outline-none 
                rounded-md 
                transition-all 
                duration-150
                relative
                ${isFocused 
                    ? 'bg-blue-50 ring-2 ring-blue-400 dark:bg-blue-900/20 dark:ring-blue-500 px-1.5 py-0.5' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
            `}
            style={{
                boxSizing: 'border-box',
                cursor: 'text',
            }}
        >
            <Tag
                ref={contentRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                className={`
                    ${className} 
                    outline-none 
                    relative
                    ${isEmpty && !isFocused ? 'text-gray-400' : ''}
                `}
                style={{ 
                    ...style, 
                    cursor: 'text',
                    display: 'inline-block',
                    minWidth: '20px',
                    boxSizing: 'border-box',
                    whiteSpace: multiline ? 'pre-wrap' : 'nowrap',
                    wordWrap: multiline ? 'break-word' : 'normal',
                }}
                data-placeholder={placeholder}
            >
                {displayValue || (isFocused ? '' : placeholder)}
            </Tag>
        </div>
    );
};
