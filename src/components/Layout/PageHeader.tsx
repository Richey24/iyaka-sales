import { useTranslations } from "next-intl";
import { FaDownload, FaPlus, FaStar } from "react-icons/fa";

const PageHeader: React.FC<{ title: React.ReactNode; onAdd?: () => void; onExport?: () => void; addText?: string; canExport?: boolean; addDisabled?: boolean; addTooltip?: string; }> = ({ title, onAdd, onExport, addText, canExport = false, addDisabled = false, addTooltip = '' }) => {
    const t = useTranslations();

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col"><h1 className="text-[16px] md:text-3xl font-bold">{title}</h1></div>
            <div className="flex items-center space-x-2">
                {onExport && (
                    <div className="relative group">
                        <button onClick={onExport} disabled={!canExport} className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer !text-[12px] md:text-base">
                            <FaDownload className="h-3 md:h-5 w-3 md:w-5 mr-2" />
                            {t('pageHeader.export')}
                        </button>
                        {!canExport && (
                            <div className="absolute -top-1 -right-1">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-yellow-900">
                                    <FaStar className="h-3 w-3" />
                                </span>
                            </div>
                        )}
                    </div>
                )}
                {onAdd && addText && (
                    <button
                        onClick={onAdd}
                        className="flex items-center px-4 py-2 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-accent-hover transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer !text-[12px] md:text-base"
                        disabled={addDisabled}
                        title={addTooltip}
                    >
                        <FaPlus className="h-3 md:h-5 w-3 md:w-5 mr-2" />
                        {addText}
                    </button>
                )}
            </div>
        </div>
    );
}

export default PageHeader