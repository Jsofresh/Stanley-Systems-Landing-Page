import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {StanleyDemoShortVertical} from './compositions/StanleyDemoShort';
import {BillingLeakMobile, defaultBillingLeakMobileProps, billingLeakMobileSchema, billingLeakMobileDuration} from './compositions/BillingLeakMobile';
import {duration, fps, height, width} from './theme';
import LegacyAutomationMenu from './legacy-automation-menu';

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="AutomationMenu" component={LegacyAutomationMenu} durationInFrames={26 * 30} fps={30} width={1920} height={1080} />
      <Composition id="stanley-demo-short-vertical" component={StanleyDemoShortVertical} durationInFrames={duration} fps={fps} width={width} height={height} />
      <Composition
        id="billing-leak-mobile"
        component={BillingLeakMobile}
        durationInFrames={billingLeakMobileDuration}
        fps={fps}
        width={width}
        height={height}
        defaultProps={defaultBillingLeakMobileProps}
        schema={billingLeakMobileSchema}
      />
    </>
  );
};

registerRoot(RemotionRoot);
