/**
 * 파일 업로드 컴포넌트
 * 드래그 앤 드롭 지원
 */

'use client';

import { useCallback, useState } from 'react';
import { Upload, X, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  /**
   * 파일 선택 핸들러
   */
  onFileSelect?: (files: File[]) => void;
  /**
   * 허용되는 파일 타입
   */
  accept?: string;
  /**
   * 다중 파일 선택 여부
   */
  multiple?: boolean;
  /**
   * 최대 파일 크기 (바이트)
   */
  maxSize?: number;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 추가 클래스명
   */
  className?: string;
}

export function FileUpload({
  onFileSelect,
  accept,
  multiple = false,
  maxSize,
  disabled = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const newFiles = Array.from(fileList);

      // 파일 크기 검증
      if (maxSize) {
        const validFiles = newFiles.filter((file) => file.size <= maxSize);
        if (validFiles.length !== newFiles.length) {
          alert(`파일 크기는 ${(maxSize / 1024 / 1024).toFixed(2)}MB를 초과할 수 없습니다.`);
          return;
        }
      }

      setFiles(multiple ? [...files, ...newFiles] : newFiles);
      onFileSelect?.(multiple ? [...files, ...newFiles] : newFiles);
    },
    [files, multiple, maxSize, onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFileSelect?.(newFiles);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'relative rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          isDragging && 'border-primary bg-primary/5',
          disabled && 'cursor-not-allowed opacity-50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-sm text-muted-foreground">
          파일을 드래그하거나 클릭하여 선택하세요
        </p>
        {maxSize && (
          <p className="mt-2 text-xs text-muted-foreground">
            최대 파일 크기: {(maxSize / 1024 / 1024).toFixed(2)}MB
          </p>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <File className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
