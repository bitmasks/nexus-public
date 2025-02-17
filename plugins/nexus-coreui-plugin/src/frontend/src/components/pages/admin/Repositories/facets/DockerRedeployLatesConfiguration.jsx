/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
import React, {useEffect} from 'react';

import {FormUtils} from '@sonatype/nexus-ui-plugin';

import {NxCheckbox, NxFieldset, NxTooltip} from '@sonatype/react-shared-components';

import UIStrings from '../../../../../constants/UIStrings';

const {LABEL, DESCRIPTION, TOOLTIP} = UIStrings.REPOSITORIES.EDITOR.REDEPLOY_LATEST;

const ALLOW_ONCE = 'ALLOW_ONCE';

export default function DockerRedeployLatesConfiguration({parentMachine}) {
  const [parentState, sendParent] = parentMachine;

  const {
    data: {
      storage: {writePolicy, latestPolicy}
    }
  } = parentState.context;

  const propName = 'storage.latestPolicy';

  useEffect(() => {
    if (writePolicy === ALLOW_ONCE) {
      if (latestPolicy === undefined) {
        sendParent({type: 'UPDATE', name: propName, value: false});
      }
    } else {
      sendParent({type: 'DELETE_DATA_PROPERTY', propName});
    }
  }, [writePolicy]);

  const isDisabled = writePolicy !== ALLOW_ONCE;

  return (
    <NxFieldset label={LABEL}>
      <NxTooltip title={isDisabled ? TOOLTIP : null}>
        <NxCheckbox
          {...FormUtils.checkboxProps(propName, parentState)}
          onChange={FormUtils.handleUpdate(propName, sendParent)}
          disabled={isDisabled}
          overflowTooltip={!isDisabled}
        >
          {DESCRIPTION}
        </NxCheckbox>
      </NxTooltip>
    </NxFieldset>
  );
}
