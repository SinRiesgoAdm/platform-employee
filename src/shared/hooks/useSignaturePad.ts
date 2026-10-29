import { useRef, useState, type PointerEvent } from 'react';

interface UseSignaturePadOptions {
    lineWidth?: number;
    strokeStyle?: string;
    fileName?: string;
}

const getPoint = (
    canvas: HTMLCanvasElement,
    event: PointerEvent<HTMLCanvasElement>,
) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: ((event.clientX - rect.left) / rect.width) * canvas.width,
        y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
};

/**
 * Maneja el trazo de una firma sobre un canvas (dedo, lápiz o mouse)
 * y permite exportarla como archivo PNG para subirla al servidor.
 */
export const useSignaturePad = ({
    lineWidth = 2.5,
    strokeStyle = '#1f2937',
    fileName = 'firma.png',
}: UseSignaturePadOptions = {}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const drawing = useRef(false);
    const [hasSignature, setHasSignature] = useState(false);

    const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        canvas.setPointerCapture(event.pointerId);
        const { x, y } = getPoint(canvas, event);
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.moveTo(x, y);
        drawing.current = true;
    };

    const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !drawing.current) return;

        const { x, y } = getPoint(canvas, event);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (!hasSignature) setHasSignature(true);
    };

    const onPointerEnd = () => {
        drawing.current = false;
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        setHasSignature(false);
    };

    const toFile = (): Promise<File | null> =>
        new Promise((resolve) => {
            const canvas = canvasRef.current;
            if (!canvas || !hasSignature) return resolve(null);

            canvas.toBlob((blob) => {
                resolve(
                    blob
                        ? new File([blob], fileName, { type: 'image/png' })
                        : null,
                );
            }, 'image/png');
        });

    return {
        canvasRef,
        hasSignature,
        clear,
        toFile,
        canvasProps: {
            ref: canvasRef,
            onPointerDown,
            onPointerMove,
            onPointerUp: onPointerEnd,
            onPointerLeave: onPointerEnd,
            onPointerCancel: onPointerEnd,
        },
    };
};
