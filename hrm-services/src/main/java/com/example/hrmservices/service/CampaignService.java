package com.example.hrmservices.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hrmservices.model.Campaign;
import com.example.hrmservices.repository.CampaignRepo;


@Service
@RequiredArgsConstructor
public class CampaignService{
    @Autowired
    private CampaignRepo campaignRepo;

    public Campaign createCampaign(Campaign campaign) {
        if (campaign.getStartTime().isAfter(campaign.getEndTime())) {
            throw new IllegalArgumentException("Start time cannot be after end time");
        }
        return campaignRepo.save(campaign);
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepo.findAll();
    }

    public List<Campaign> getVisibleCampaigns() {
        return campaignRepo.findAllByVisible(true);
    }

    public List<Campaign> getOngoingCampaigns() {
        return campaignRepo.findAllByStartTimeAfter(LocalDateTime.now());
    }

    public Optional<Campaign> getCampaignById(String id) {
        return campaignRepo.findById(id);
    }

    public Campaign updateCampaign(String id, Campaign updateDetails) {
        return campaignRepo.findById(id)
                .map(campaign -> {
                    campaign.setName(updateDetails.getName());
                    campaign.setStartTime(updateDetails.getStartTime());
                    campaign.setEndTime(updateDetails.getEndTime());
                    campaign.setDescription(updateDetails.getDescription());
                    campaign.setMaxParticipants(updateDetails.getMaxParticipants());
                    campaign.setCreatedBy(updateDetails.getCreatedBy());
                    campaign.setVisible(updateDetails.isVisible());
                    return campaignRepo.save(campaign);
                })
                .orElseGet(() -> {
                    updateDetails.setId(id);
                    return campaignRepo.save(updateDetails);
                });
    }


    public void deleteCampaign(String id) {
        campaignRepo.deleteById(id);
    }
}