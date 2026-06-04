import type { CarbonApi } from '../types/api/carbon'

export const carbonApiPaths = {
  getCurrentSpace: 'GET /api/so/carbon/space/current',
  getSpaceList: 'POST /api/so/carbon/space/list',
  createSpace: 'POST /api/so/carbon/space/create',
  updateSpace: 'POST /api/so/carbon/space/update',
  deleteSpace: 'POST /api/so/carbon/space/delete',
  setDefaultSpace: 'POST /api/so/carbon/space/default/set',
  getSpaceDetail: 'GET /api/so/carbon/space/detail',
  createInvite: 'POST /api/so/carbon/invite/create',
  getInviteDetail: 'GET /api/so/carbon/invite/detail',
  acceptInvite: 'POST /api/so/carbon/invite/accept',
  getMomentList: 'POST /api/so/carbon/moment/list',
  createMoment: 'POST /api/so/carbon/moment/create',
  deleteMoment: 'POST /api/so/carbon/moment/delete',
  reactMoment: 'POST /api/so/carbon/moment/react',
  getAgreementList: 'POST /api/so/carbon/agreement/list',
  createAgreement: 'POST /api/so/carbon/agreement/create',
  getAgreementDetail: 'GET /api/so/carbon/agreement/detail',
  updateAgreement: 'POST /api/so/carbon/agreement/update',
  markAgreementRead: 'POST /api/so/carbon/agreement/read',
  agreeAgreement: 'POST /api/so/carbon/agreement/agree',
  startAgreement: 'POST /api/so/carbon/agreement/start',
  completeAgreement: 'POST /api/so/carbon/agreement/complete',
  pauseAgreement: 'POST /api/so/carbon/agreement/pause',
  resumeAgreement: 'POST /api/so/carbon/agreement/resume',
  deleteAgreement: 'POST /api/so/carbon/agreement/delete',
  getScaleList: 'POST /api/so/carbon/scale/list',
  createScale: 'POST /api/so/carbon/scale/create',
  getScaleDetail: 'GET /api/so/carbon/scale/detail',
  updateScale: 'POST /api/so/carbon/scale/update',
  deleteScale: 'POST /api/so/carbon/scale/delete',
} as const

export type GetCurrentSpaceResp = CarbonApi.GetCurrentSpaceResp
export type AgreementView = CarbonApi.AgreementView
export type ScaleView = CarbonApi.ScaleView
