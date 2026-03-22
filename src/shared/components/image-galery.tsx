import { useState, useEffect, useRef, useCallback } from "react";
import type { ImageInformationDto } from "../../models/ImageInformationDto";
import { getAllImages } from "../services/image-resquest";
import { normalizeImagePath } from "../utils/string-formater";

export default function ImageGallery() {
    const [images, setImages] = useState<ImageInformationDto[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const fetchImages = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const data = await getAllImages(`?page=${page}&size=20&sort=id,asc`);
            setImages(prev => [...prev, ...data.content]);
            setHasMore(!data.last); // data.last = true quando for a última página
            setPage(prev => prev + 1);
        } catch (err) {
            console.error("Erro ao buscar imagens:", err);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    // Carrega a primeira página
    useEffect(() => {
        fetchImages();
    }, []);

    // Observa o último elemento da lista
    const lastImageRef = useCallback((node: HTMLImageElement | null) => {
        if (loading) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchImages();
            }
        });

        if (node) observerRef.current.observe(node);
    }, [loading, hasMore, fetchImages]);

    return (
        <div style={{ columns: "4 200px", gap: "8px", padding: "16px" }
        }>
            {
                images.map((image, index) => {
                    const isLast = index === images.length - 1;
                    console.log(normalizeImagePath(image.fullPath))
                    return (
                        <img
                            key={index}
                            ref={isLast ? lastImageRef : null}
                            src={`/${normalizeImagePath(image.fullPath)}`
                            } // ajuste o campo conforme seu DTO
                            alt={image.description || image.fileName}
                            style={{ width: "100%", marginBottom: "8px", borderRadius: "8px" }}
                        />
                    );
                })}

            {
                loading && (
                    <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
                        Carregando...
                    </p>
                )
            }

            {
                !hasMore && (
                    <p style={{ textAlign: "center", gridColumn: "1/-1" }}>
                        Fim das imagens
                    </p>
                )
            }
        </div>
    );
}