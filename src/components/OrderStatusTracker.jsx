import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  ShoppingBag, 
  PackageCheck, 
  XCircle, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { ORDER_TRACKING_STAGES } from '../utils/orderUtils';

/**
 * OrderStatusTracker Component
 * 
 * Color specifications as required:
 * - Green: completed stages
 * - Orange: in-progress stage
 * - Gray: pending stages
 * - Red: cancelled or failed orders
 */
export default function OrderStatusTracker({ order, isCompact = false }) {
  if (!order) return null;

  const isCancelled = order.status === 'Cancelled';

  // Normalize status mapping
  let currentStatus = order.status;
  if (currentStatus === 'Placed') currentStatus = 'Order Placed';
  if (currentStatus === 'Completed') currentStatus = 'Collected';

  const stages = ORDER_TRACKING_STAGES || [
    { key: 'Order Placed', label: 'Order Placed', desc: 'Received by outlet' },
    { key: 'Confirmed', label: 'Confirmed', desc: 'Accepted by kitchen' },
    { key: 'Preparing', label: 'Preparing', desc: 'Cooking & packing' },
    { key: 'Ready for Pickup', label: 'Ready for Pickup', desc: 'Waiting at counter' },
    { key: 'Collected', label: 'Collected', desc: 'Food collected' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Order Placed':
      case 'Placed': return 0;
      case 'Confirmed': return 1;
      case 'Preparing': return 2;
      case 'Ready for Pickup': return 3;
      case 'Collected':
      case 'Completed': return 4;
      default: return 1;
    }
  };

  const currentIdx = getStageIndex(currentStatus);
  const isFullyCollected = currentStatus === 'Collected' || currentStatus === 'Completed';

  // Helper to get icon for stage
  const getStageIcon = (idx, isCompleted, isCurrent, isPending) => {
    if (isCompleted) {
      return <CheckCircle2 className="w-4 h-4 text-white stroke-[2.5]" />;
    }
    if (isCurrent) {
      switch (idx) {
        case 0: return <ShoppingBag className="w-4 h-4 text-white animate-pulse" />;
        case 1: return <CheckCircle2 className="w-4 h-4 text-white animate-pulse" />;
        case 2: return <ChefHat className="w-4 h-4 text-white animate-pulse" />;
        case 3: return <Clock className="w-4 h-4 text-white animate-pulse" />;
        case 4: return <PackageCheck className="w-4 h-4 text-white" />;
        default: return <Clock className="w-4 h-4 text-white" />;
      }
    }
    return <span className="text-xs font-semibold text-stone-400">{idx + 1}</span>;
  };

  // If order was cancelled
  if (isCancelled) {
    return (
      <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 text-xs text-rose-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-rose-700 text-sm">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>Order Cancelled</span>
          <span className="text-[11px] font-normal px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md ml-auto">
            Status: Cancelled
          </span>
        </div>
        <p className="text-rose-800/90 leading-relaxed pl-7 text-xs">
          {order.cancellationReason 
            ? `Reason: ${order.cancellationReason}` 
            : 'This order was cancelled before food preparation began.'}
        </p>
        {order.cancelledAt && (
          <div className="text-[11px] text-rose-600/80 pl-7 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Cancelled at {new Date(order.cancelledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </div>
    );
  }

  // Find stage timestamp from order timeline if available
  const getStageTime = (stageKey, idx) => {
    if (order.timeline && Array.isArray(order.timeline)) {
      const match = order.timeline.find(t => t.stage === stageKey);
      if (match && match.time) return match.time;
    }
    if (idx === 0) return order.orderDate?.split(',')[1]?.trim() || 'Received';
    if (idx === 1 && currentIdx >= 1) return 'Confirmed';
    if (idx === 2 && currentIdx >= 2) return 'In Kitchen';
    if (idx === 3 && currentIdx >= 3) return 'Ready';
    if (idx === 4 && isFullyCollected) return 'Collected';
    return null;
  };

  return (
    <div className="w-full">
      {/* Progress tracker container */}
      <div className="relative">
        
        {/* Horizontal connector line behind the circles */}
        <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-stone-200 rounded-full z-0">
          <div 
            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
            style={{
              width: isFullyCollected 
                ? '100%' 
                : `${(currentIdx / (stages.length - 1)) * 100}%`
            }}
          />
        </div>

        {/* 5 Stages Grid */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2 relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = isFullyCollected || idx < currentIdx;
            const isCurrent = !isFullyCollected && idx === currentIdx;
            const isPending = !isFullyCollected && idx > currentIdx;

            const timeStr = getStageTime(stage.key, idx);

            return (
              <div key={stage.key} className="flex flex-col items-center text-center">
                {/* Circle Indicator */}
                <div 
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                      : isCurrent
                      ? 'bg-[#EAA044] text-white ring-4 ring-amber-100 shadow-md scale-105'
                      : 'bg-stone-200 text-stone-400 border border-stone-300'
                  }`}
                  title={`${stage.label} (${isCompleted ? 'Completed' : isCurrent ? 'In-progress' : 'Pending'})`}
                >
                  {getStageIcon(idx, isCompleted, isCurrent, isPending)}
                </div>

                {/* Stage Label */}
                <div className="mt-2 space-y-0.5 px-0.5">
                  <div 
                    className={`text-[10px] sm:text-xs font-bold leading-tight ${
                      isCompleted 
                        ? 'text-emerald-700' 
                        : isCurrent 
                        ? 'text-[#EAA044] font-black' 
                        : 'text-stone-400'
                    }`}
                  >
                    {stage.label}
                  </div>

                  {/* Stage description on larger screens */}
                  {!isCompact && (
                    <div className="text-[10px] text-stone-400 hidden md:block line-clamp-1">
                      {isCurrent ? 'In Progress' : isCompleted ? 'Finished' : stage.desc}
                    </div>
                  )}

                  {/* Timestamp if available */}
                  {timeStr && (
                    <div className={`text-[9px] sm:text-[10px] font-mono leading-none ${
                      isCurrent ? 'text-amber-700 font-bold' : 'text-stone-500'
                    }`}>
                      {timeStr}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Legend / Current Stage Banner */}
      {!isCompact && (
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400">Current Phase:</span>
            <span className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
              isFullyCollected
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-900 border border-amber-200'
            }`}>
              {stages[currentIdx]?.label}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#EAA044] inline-block" /> In-Progress
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-stone-300 inline-block" /> Pending
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
