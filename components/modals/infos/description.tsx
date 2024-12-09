import { AlignLeft } from 'lucide-react';
import { useState } from 'react';

export function Description() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full px-6 py-4">
      <div className="flex flex-row items-center gap-1">
        <AlignLeft size={13} className="text-gray-500" strokeWidth={2.5} />
        <p className="text-sm font-bold">Description</p>
      </div>
      <div className="w-full">
        <p className={`text-sm font-bold text-gray-500 ${!isExpanded ? 'line-clamp-1' : ''}`}>
          Kuma is a company that provides a platform for creating and trading yield-generating
          assets. the yield is generated by the staking of the assets in the Morpho protocol. Kuma
          is a company that provides a platform for creating and trading yield-generating assets.
          the yield is generated by the staking of the assets in the Morpho protocol. Kuma is a
          company that provides a platform for creating and trading yield-generating assets. the
          yield is generated by the staking of the assets in the Morpho protocol. Kuma is a company
          that provides a platform for creating and trading yield-generating assets. the yield is
          generated by the staking of the assets in the Morpho protocol. Kuma is a company that
          provides a platform for creating and trading yield-generating assets. the yield is
          generated by the staking of the assets in the Morpho protocol. Kuma is a company that
          provides a platform for creating and trading yield-generating assets. the yield is
          generated by the staking of the assets in the Morpho protocol. Kuma is a company that
          provides a platform for creating and trading yield-generating assets. the yield is
          generated by the staking of the assets in the Morpho protocol.
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-bold text-blue-500">
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </div>
  );
}
