// Custom hook for Settings page functionality
import { useState, useEffect, useCallback } from 'react';
import {
  generalSettings,
  accountSettings,
  pricingAPI,
  rolesAPI,
  zonesAPI,
  notificationsAPI,
  vehiclesAPI,
  paymentAPI,
  reportsAPI,
  securityAPI,
  deliveryAPI
} from '../api/settings';

export const useSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });
  const [editModal, setEditModal] = useState({ isOpen: false });

  // Utility Functions
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const showConfirm = useCallback((title, message, onConfirm, type = 'warning') => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm,
      type
    });
  }, []);

  const hideConfirm = useCallback(() => {
    setConfirmDialog({ isOpen: false });
  }, []);

  const showEditModal = useCallback((title, content, onSave) => {
    setEditModal({
      isOpen: true,
      title,
      content,
      onSave
    });
  }, []);

  const hideEditModal = useCallback(() => {
    setEditModal({ isOpen: false });
  }, []);

  // API Integration Functions
  const saveSettings = useCallback(async (data, settingsType) => {
    setIsLoading(true);
    try {
      switch (settingsType) {
        case 'general':
          await generalSettings.update(data);
          break;
        case 'account':
          await accountSettings.update(data);
          break;
        case 'pricing':
          await pricingAPI.updateGlobalPricing(data);
          break;
        case 'roles':
          await rolesAPI.updateRolePermissions(data);
          break;
        case 'zones':
          await zonesAPI.updateZone(data.id, data);
          break;
        case 'notifications':
          await notificationsAPI.updateSettings(data);
          break;
        case 'vehicles':
          await vehiclesAPI.updateVehicleType(data.id, data);
          break;
        case 'payments':
          await paymentAPI.updatePaymentSettings(data);
          break;
        case 'reports':
          await reportsAPI.updateAutomatedReports(data);
          break;
        case 'security':
          await securityAPI.updatePassword(data);
          break;
        case 'delivery':
          await deliveryAPI.updateSettings(data);
          break;
        default:
          throw new Error(`Unknown settings type: ${settingsType}`);
      }
      showToast('Settings saved successfully');
      return true;
    } catch (error) {
      showToast('Failed to save settings', 'error');
      console.error('Save settings error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // CRUD Operations
  const createItem = useCallback(async (data, itemType) => {
    setIsLoading(true);
    try {
      let result;
      switch (itemType) {
        case 'regional-rule':
          result = await pricingAPI.createRegionalRule(data);
          break;
        case 'promotion':
          result = await pricingAPI.createPromotion(data);
          break;
        case 'zone':
          result = await zonesAPI.createZone(data);
          break;
        case 'zone-override':
          result = await zonesAPI.createZoneOverride(data);
          break;
        case 'vehicle':
          result = await vehiclesAPI.createVehicleType(data);
          break;
        default:
          throw new Error(`Unknown item type: ${itemType}`);
      }
      showToast(`${itemType.replace('-', ' ')} created successfully`);
      return result;
    } catch (error) {
      showToast(`Failed to create ${itemType.replace('-', ' ')}`, 'error');
      console.error(`Create ${itemType} error:`, error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const updateItem = useCallback(async (id, data, itemType) => {
    setIsLoading(true);
    try {
      let result;
      switch (itemType) {
        case 'regional-rule':
          result = await pricingAPI.updateRegionalRule(id, data);
          break;
        case 'promotion':
          result = await pricingAPI.updatePromotion(id, data);
          break;
        case 'zone':
          result = await zonesAPI.updateZone(id, data);
          break;
        case 'zone-override':
          result = await zonesAPI.updateZoneOverride(id, data);
          break;
        case 'vehicle':
          result = await vehiclesAPI.updateVehicleType(id, data);
          break;
        default:
          throw new Error(`Unknown item type: ${itemType}`);
      }
      showToast(`${itemType.replace('-', ' ')} updated successfully`);
      return result;
    } catch (error) {
      showToast(`Failed to update ${itemType.replace('-', ' ')}`, 'error');
      console.error(`Update ${itemType} error:`, error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const deleteItem = useCallback(async (id, itemType) => {
    setIsLoading(true);
    try {
      switch (itemType) {
        case 'regional-rule':
          await pricingAPI.deleteRegionalRule(id);
          break;
        case 'promotion':
          await pricingAPI.deletePromotion(id);
          break;
        case 'zone':
          await zonesAPI.deleteZone(id);
          break;
        case 'zone-override':
          await zonesAPI.deleteZoneOverride(id);
          break;
        case 'vehicle':
          await vehiclesAPI.deleteVehicleType(id);
          break;
        default:
          throw new Error(`Unknown item type: ${itemType}`);
      }
      showToast(`${itemType.replace('-', ' ')} deleted successfully`);
      return true;
    } catch (error) {
      showToast(`Failed to delete ${itemType.replace('-', ' ')}`, 'error');
      console.error(`Delete ${itemType} error:`, error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Special Operations
  const generateReport = useCallback(async (reportType) => {
    setIsLoading(true);
    try {
      const result = await reportsAPI.generateReport(reportType);
      showToast('Report generated successfully');
      return result;
    } catch (error) {
      showToast('Failed to generate report', 'error');
      console.error('Generate report error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const downloadReport = useCallback(async (reportId) => {
    setIsLoading(true);
    try {
      const result = await reportsAPI.downloadReport(reportId);
      // Handle download logic here
      showToast('Report downloaded successfully');
      return result;
    } catch (error) {
      showToast('Failed to download report', 'error');
      console.error('Download report error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const mergeZones = useCallback(async (zoneIds) => {
    setIsLoading(true);
    try {
      const result = await zonesAPI.mergeZones(zoneIds);
      showToast('Zones merged successfully');
      return result;
    } catch (error) {
      showToast('Failed to merge zones', 'error');
      console.error('Merge zones error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const toggle2FA = useCallback(async (enabled) => {
    setIsLoading(true);
    try {
      await securityAPI.toggle2FA(enabled);
      showToast(`Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`);
      return true;
    } catch (error) {
      showToast('Failed to update 2FA setting', 'error');
      console.error('Toggle 2FA error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Event Handlers
  const handleEdit = useCallback((item, itemType) => {
    showEditModal(
      `Edit ${itemType.replace('-', ' ')}`,
      item,
      async (updatedData) => {
        const success = await updateItem(item.id, updatedData, itemType);
        if (success) {
          hideEditModal();
        }
        return success;
      }
    );
  }, [showEditModal, updateItem, hideEditModal]);

  const handleDelete = useCallback((item, itemType) => {
    showConfirm(
      `Delete ${itemType.replace('-', ' ')}`,
      `Are you sure you want to delete this ${itemType.replace('-', ' ')}? This action cannot be undone.`,
      async () => {
        const success = await deleteItem(item.id, itemType);
        if (success) {
          hideConfirm();
          // Trigger data refresh if needed
        }
        return success;
      },
      'danger'
    );
  }, [showConfirm, deleteItem, hideConfirm]);

  const handleAdd = useCallback((itemType) => {
    showEditModal(
      `Add ${itemType.replace('-', ' ')}`,
      {},
      async (newData) => {
        const result = await createItem(newData, itemType);
        if (result) {
          hideEditModal();
        }
        return !!result;
      }
    );
  }, [showEditModal, createItem, hideEditModal]);

  return {
    // State
    isLoading,
    toast,
    confirmDialog,
    editModal,
    
    // Utility functions
    showToast,
    showConfirm,
    hideConfirm,
    showEditModal,
    hideEditModal,
    
    // API functions
    saveSettings,
    createItem,
    updateItem,
    deleteItem,
    generateReport,
    downloadReport,
    mergeZones,
    toggle2FA,
    
    // Event handlers
    handleEdit,
    handleDelete,
    handleAdd
  };
};
