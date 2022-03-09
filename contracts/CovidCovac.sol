pragma experimental ABIEncoderV2;
pragma solidity ^0.7.0;

contract CovidCovac {
    mapping(uint => CovacInfo) public covac;
    uint public covacCount = 0;

    struct CovacInfo {
        uint id;
        string name;
        string nameVacin;
        string dateInjections;
        string insertDate;
        address payable userCreator;
        string cardID;
        uint gender;
        string healID;
        string birthDate;
        string userAddress;
    }

    event CovacCreated (
        uint id,
        string name,
        string nameVacin,
        string dateInjections,
        string insertDate,
        address payable userCreator,
        string cardID,
        uint gender,
        string healID,
        string birthDate,
        string userAddress
    );

    struct userInput {
        string name;
        string nameVacin;
        string dateInjections;
        string insertDate;
        string cardID;
        uint gender;
        string healID;
        string birthDate;
        string userAddress;
    }
    function createCovac(userInput memory data) public payable {
        covac[covacCount] = CovacInfo(covacCount, data.name, data.nameVacin, data.dateInjections, data.insertDate, msg.sender, data.cardID, data.gender, data.healID, data.birthDate, data.userAddress);
        emit CovacCreated(covacCount, data.name, data.nameVacin, data.dateInjections, data.insertDate, msg.sender, data.cardID, data.gender, data.healID, data.birthDate, data.userAddress);
        covacCount++;
    }
    function editCovac(userInput memory data, uint id) public payable {
        covac[id] = CovacInfo(id, data.name, data.nameVacin, data.dateInjections, data.insertDate, msg.sender, data.cardID, data.gender, data.healID, data.birthDate, data.userAddress);
        emit CovacCreated(id, data.name, data.nameVacin, data.dateInjections, data.insertDate, msg.sender, data.cardID, data.gender, data.healID, data.birthDate, data.userAddress);

    }

    function getUserCovac(uint _id) public view returns (CovacInfo[] memory){
        CovacInfo memory _covac_base = covac[_id];
        CovacInfo[] memory _covac_relative = new CovacInfo[](10);
        uint _count = 0;
        for(uint i = 0; i < covacCount; i++){
            if(compareStrings(covac[i].cardID, _covac_base.cardID) || compareStrings(covac[i].healID, _covac_base.healID)){
                CovacInfo storage covacData = covac[i];
                _covac_relative[_count] = covacData;
                _count++;
            }
        }
        return _covac_relative;
    }
    function getCovacCount() public view returns (uint) {
        return covacCount;
    }

    function search(string memory q) public view returns (CovacInfo[] memory){
        CovacInfo[] memory _covac_relative = new CovacInfo[](10);
        uint _count = 0;
        for(uint i = 0; i < covacCount; i++){
            if(compareStrings(covac[i].cardID, q) || compareStrings(covac[i].healID, q)){
                CovacInfo storage covacData = covac[i];
                _covac_relative[_count] = covacData;
                _count++;
            }
        }
        return _covac_relative;
    }

    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

}