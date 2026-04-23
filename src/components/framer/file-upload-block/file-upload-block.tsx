import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CloudArrowUpIcon,
  FilePdfIcon,
  FileDocIcon,
  FileImageIcon,
  XIcon,
  CheckCircleIcon,
  TrashIcon,
  LinkIcon,
  InfoIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "completed";
}

export const FileUploadBlock = () => {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => startUpload(file));
    }
  };

  const startUpload = (file: File) => {
    const id = Math.random().toString(36).substring(7);
    const newFile: UploadingFile = {
      id,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
    };

    setFiles((prev) => [newFile, ...prev]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: "completed" } : f,
          ),
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress } : f)),
        );
      }
    }, 400);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return {
          icon: (
            <FilePdfIcon size={44} weight="duotone" className="text-red-500" />
          ),
          label: "PDF",
          color: "bg-red-500",
        };
      case "doc":
      case "docx":
        return {
          icon: (
            <FileDocIcon size={44} weight="duotone" className="text-blue-500" />
          ),
          label: "DOC",
          color: "bg-blue-500",
        };
      case "png":
      case "jpg":
      case "jpeg":
      case "webp":
        return {
          icon: (
            <FileImageIcon
              size={44}
              weight="duotone"
              className="text-purple-500"
            />
          ),
          label: "IMG",
          color: "bg-purple-500",
        };
      default:
        return {
          icon: (
            <FilePdfIcon size={44} weight="duotone" className="text-gray-500" />
          ),
          label: "FILE",
          color: "bg-gray-500",
        };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#EBEBEB] p-4">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-4xl shadow-xl overflow-hidden border- border-[#E3E3E3] flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB] shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
              <CloudArrowUpIcon size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Upload files
              </h2>
              <p className="text-sm text-gray-500">
                Select and upload the files of your choice
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <XIcon size={20} weight="bold" />
          </button>
        </div>

        <motion.div
          layout
          className="p-6 overflow-y-auto space-y-6 custom-scrollbar"
        >
          {/* Dropzone */}
          <motion.div
            layout
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const droppedFiles = e.dataTransfer.files;
              if (droppedFiles)
                Array.from(droppedFiles).forEach((f) => startUpload(f));
            }}
            className={cn(
              " rounded-2xl p-10 flex flex-col items-center justify-center shrink-0 transition-colors duration-200",
              isDragging
                ? "custom-dash-border-active bg-blue-50/50"
                : "custom-dash-border bg-white",
            )}
          >
            <motion.div layout className="text-gray-600 mb-4">
              <CloudArrowUpIcon size={32} />
            </motion.div>
            <motion.p layout className="text-base font-semibold text-gray-900">
              Choose a file or drag & drop it here.
            </motion.p>
            <motion.p layout className="text-xs text-gray-500 mt-1 uppercase">
              PDF, DOC, PNG, and JPG formats, up to 50 MB.
            </motion.p>
            <motion.button
              layout
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Browse File
            </motion.button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
            />
          </motion.div>

          {/* File List */}
          <div className="flex flex-col">
            <AnimatePresence initial={false} mode="popLayout">
              {files.map((file) => {
                const { icon, label, color } = getFileIcon(file.name);
                return (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 10 }}
                    transition={{
                      layout: {
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                        mass: 1,
                      },
                      opacity: { duration: 0.2 },
                    }}
                    className="border border-gray-200 rounded-2xl p-4 mb-3 last:mb-0 bg-white shrink-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        {icon}
                        <div
                          className={cn(
                            "absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white px-1 rounded-sm",
                            color,
                          )}
                        >
                          {label}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-900 truncate pr-4">
                            {file.name}
                          </span>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            {file.status === "uploading" ? (
                              <XIcon size={18} />
                            ) : (
                              <TrashIcon size={18} />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>
                            {formatSize((file.size * file.progress) / 100)} of{" "}
                            {formatSize(file.size)}
                          </span>
                          <span className="text-gray-300">•</span>
                          <div className="flex items-center gap-1.5">
                            {file.status === "uploading" ? (
                              <>
                                <SpinnerIcon
                                  size={14}
                                  className="animate-spin text-blue-500"
                                />
                                <span className="text-gray-600">
                                  Uploading...
                                </span>
                              </>
                            ) : (
                              <>
                                <CheckCircleIcon
                                  size={14}
                                  weight="fill"
                                  className="text-green-500"
                                />
                                <span className="text-gray-600">Completed</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            className={cn(
                              "h-full",
                              file.status === "completed"
                                ? "bg-green-500"
                                : "bg-blue-600",
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Separator */}
          <motion.div layout className="flex items-center gap-4 shrink-0">
            <div className="flex-1 h-px bg-[#EBEBEB]" />
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
              OR
            </span>
            <div className="flex-1 h-px bg-[#EBEBEB]" />
          </motion.div>

          {/* URL Import */}
          <motion.div layout className="space-y-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-900">
                Import from URL Link
              </span>
              <InfoIcon size={14} className="text-gray-300" weight="fill" />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <LinkIcon size={20} />
              </div>
              <input
                type="text"
                placeholder="Paste file URL"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <style>{`
        .custom-scrollbar {
          scrollbar-width: none;
          scrollbar-gutter: stable;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-dash-border {
            /* stroke-dasharray='12, 12' -> 12px dash, 12px gap
               stroke-linecap='round' -> This gives the dashes the rounded ends
            */
            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='%23D1D5DB' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
            border-radius: 2rem; /* Matches your rounded-[2rem] class */
            border: none;
          }

          .custom-dash-border-active {
            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='%233B82F6' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
          }
      `}</style>
    </div>
  );
};
