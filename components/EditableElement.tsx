"use client";

import { useState, useEffect, useRef } from "react";

interface EditableElementProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    multiline?: boolean;
    tagName?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function EditableElement({
    value,
    onChange,
    placeholder = "Click to edit",
    className = "",
    multiline = false,
    tagName = "div",
}: EditableElementProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            // Auto-resize textarea
            if (multiline && inputRef.current instanceof HTMLTextAreaElement) {
                inputRef.current.style.height = "auto";
                inputRef.current.style.height = inputRef.current.scrollHeight + "px";
            }
        }
    }, [isEditing, multiline]);

    const handleBlur = () => {
        setIsEditing(false);
        if (localValue !== value) {
            onChange(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) {
            handleBlur();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setLocalValue(e.target.value);
        if (multiline && e.target instanceof HTMLTextAreaElement) {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
        }
    };

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-transparent outline-none border-b border-blue-400 resize-none overflow-hidden ${className}`}
                    placeholder={placeholder}
                    rows={1}
                />
            );
        }
        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type="text"
                value={localValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`w-full bg-transparent outline-none border-b border-blue-400 ${className}`}
                placeholder={placeholder}
            />
        );
    }

    const Tag = tagName as any;

    return (
        <Tag
            onClick={() => setIsEditing(true)}
            className={`cursor-text hover:bg-blue-50/50 hover:outline hover:outline-1 hover:outline-blue-200 rounded px-0.5 -mx-0.5 transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 ${className}`}
            data-placeholder={placeholder}
        >
            {value}
        </Tag>
    );
}
